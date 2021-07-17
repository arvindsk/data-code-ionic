import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import 'inputmask/dist/inputmask/phone-codes/phone';
import $ from 'jquery';
import select2Init from 'select2';
import 'select2/dist/css/select2.min.css';
import * as Survey from 'survey-angular';
import {ItemValue, Question} from 'survey-angular';
import * as widgets from 'surveyjs-widgets';

import 'bootstrap/dist/css/bootstrap.css';
import 'survey-angular/survey.css';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdaptService} from '../../services/adapt.service';
import {ParticipantStudy} from '../../model/ParticipantStudy';
import {Observable} from 'rxjs';
import {DataStorageService} from '../../services/data-storage.service';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import 'survey-angular/modern.css';

Survey.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
Survey.JsonObject.metaData.addProperty('page', 'popupdescription:text');

Survey.StylesManager.applyTheme('modern');


@Component({
  selector: 'app-questionnaire',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class QuestionComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  @Output() submitSurvey = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  result: any;
  json: any;
  survey;

  storageName = 'survey_patient_history';
  userId = 'Test';
  openDesc;
  closeResult = '';
  navigationUrl = '';
  participantStudy: ParticipantStudy;
  readonlyMode = false;
  msgs: Message[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modal: NgbModal,
              private adaptService: AdaptService,
              private dataStorageService: DataStorageService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    //this.json = json;
  }

  ngOnInit() {
    widgets.select2(Survey);
    widgets.select2tagbox(Survey);

    const defaultThemeColors = Survey.StylesManager.ThemeColors.default;
    defaultThemeColors['$main-color'] = '#5D001E';
    defaultThemeColors['$main-hover-color'] = '#5D001E';
    defaultThemeColors['$text-color'] = '#4a4a4a';
    defaultThemeColors['$header-color'] = '#5D001E';
    defaultThemeColors['$header-background-color'] = '#f8f8f8';
    defaultThemeColors['$body-container-background-color'] = '#f8f8f8';
    Survey.StylesManager.applyTheme();
    this.participantStudy = new ParticipantStudy();
    widgets.inputmask(Survey);
    this.participantStudy = this.dataStorageService.storage.participantStudy;
    this.navigationUrl = '/adapt/participant/' + this.participantStudy.timeline.toLowerCase() + '?participantId=' + this.participantStudy.participantId;
    this.adaptService.getQuestionnaire(this.participantStudy.studyId).subscribe((data: any) => {
        this.json = data;
        this.loadQuestionnaire();
      },
      error => {
        console.log('error occurred while loading questionnaire');
      });
  }

  loadQuestionnaire() {
    this.survey = new Survey.Model(this.json);

    this.survey.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) {
        return;
      }
      this.openDesc = options.question.popupdescription;
      // Add a button;
      const btn = document.createElement('span');
      btn.className = 'ques-icon';
      btn.innerHTML = '<ion-icon size="small" name="information-circle"></ion-icon>';
      btn.onmouseover = () => {
        console.log(options.question.popupdescription);
        this.modal.open(this.modalContent, {ariaLabelledBy: 'modal-basic-title', size: 'sm', centered: true})
          .result
          .then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      };

      const header = options.htmlElement.querySelector('h5');
      header.appendChild(btn);
    });

    this.survey.sendResultOnPageNext = true;
    this.survey.showNavigationButtons = 'none';
    this.survey.onPartialSend.add((result, options) => {
      console.log('next button click triggered' + JSON.stringify(result.data));
      this.submitSurvey.emit(result.data);
      this.result = result.data;
      this.saveSurveyData(result);
    });
    this.survey.onComplete.add((onCompleteResult, options) => {
      console.log('complete button click triggered' + JSON.stringify(onCompleteResult));
      this.saveSurveyData(onCompleteResult);
    });

    this.survey.onValueChanged.add(() => {
      this.messageService.clear('previewErrorMessage');
    });
    this.survey.showPreviewBeforeComplete = 'showAllQuestions';
    this.survey.navigateToUrl = this.navigationUrl;
    if ('Submitted' === this.participantStudy.status) {
      this.survey.mode = 'display';
      this.survey.questionsOnPageMode = 'singlePage';
      this.readonlyMode = true;
    }

    this.loadPreviousData(this.participantStudy).subscribe((prevData: ParticipantStudy) => {
      if (prevData !== null && prevData !== undefined) {
        if (prevData.studyInformation) {
          const data = JSON.parse(prevData.studyInformation);
          this.survey.data = data;
          if (data.pageNo) {
            this.survey.currentPageNo = data.pageNo;
          }
        }

      }
      Survey.SurveyNG.render('surveyElement', {model: this.survey});
    });
  }

  loadPreviousData(participantStudyObj: ParticipantStudy): Observable<ParticipantStudy> {
    /*    const participantStudy: ParticipantStudy = new ParticipantStudy();
        participantStudy.studyId = 1001;
        participantStudy.participantId = 1000;*/
    return this.adaptService.getQuestionnaireAnswer(participantStudyObj);
  }

  saveSurveyData(result: any) {
    const data = result.data;
    data.pageNo = result.currentPageNo;

    this.participantStudy.studyInformation = JSON.stringify(data);
    this.participantStudy.status = result.state;

    this.adaptService.saveQuestionnaireAnswer(this.participantStudy).subscribe((resultData: boolean) => {
      if (resultData) {
        console.log('questionnaire saved successfully');
      }
    });

    // window.localStorage.setItem(this.storageName, JSON.stringify(data));

  }

  doOnCurrentPageChanged(survey) {
    // @ts-ignore
    document.getElementById('pageSelector').value = survey.currentPageNo;
    document.getElementById('surveyPrev').style.display = !survey.isFirstPage ? 'inline' : 'none';
    document.getElementById('surveyNext').style.display = !survey.isLastPage ? 'inline' : 'none';
    document.getElementById('surveyComplete').style.display = survey.isLastPage ? 'inline' : 'none';
    document.getElementById('surveyProgress').innerText = 'Page ' + (survey.currentPageNo + 1) + ' of ' + survey.visiblePageCount + '.';
    if (document.getElementById('surveyPageNo')) { // @ts-ignore
      document.getElementById('surveyPageNo').value = survey.currentPageNo;
    }
  }

  setupPageSelector(survey) {
    const selector = document.getElementById('pageSelector');
    for (let i = 0; i < survey.visiblePages.length; i++) {
      const option = document.createElement('option');
      // @ts-ignore
      option.value = i;
      option.text = 'Page ' + (i + 1);
      // @ts-ignore
      selector.add(option);
    }
  }

  public summary(): void {
    void this.router.navigate(['adapt/home']);
  }

  public collect(): void {
    void this.router.navigate(['adapt/home']);
  }

  close() {
    this.closeModal.emit(true);
  }


  backButtonClick() {
    const navigationExtras: NavigationExtras = {
      queryParams: {participantId: this.participantStudy.participantId}
    };
    const url = 'adapt/participant/' + this.participantStudy.timeline.toLowerCase();
    void this.router.navigate([url], navigationExtras);
  }

  onPreviewClick() {
    this.saveSurveyData(this.survey);
    this.messageService.clear('previewErrorMessage');
    this.survey.showPreview();
    const allQuestions: Array<Question> = this.survey.getAllQuestions();

    const hasUnAnsweredQuestions = this.hasUnAnsweredQuestions();

    if (hasUnAnsweredQuestions) {
      this.messageService.add({
        key: 'previewErrorMessage',
        severity: 'error',
        summary: ' ',
        detail: 'Some of the questions are unanswered. Please respond to unanswered questions.'
      });
    }
  }

  onPreviousButtonClick() {
    this.msgs = [];
    this.survey.prevPage();
  }

  onNextButtonClick() {
    this.msgs = [];
    this.survey.nextPage();
  }

  onCompleteButtonClick() {
    this.msgs = [];
    this.saveSurveyData(this.survey);
    const hasUnAnsweredQuestion = this.hasUnAnsweredQuestions();
    if (hasUnAnsweredQuestion) {
      console.log('Some of the questions yet to be answered ');
      this.confirmationService.confirm({
        message: 'Some of the questions are unanswered. Would you like to continue to respond (OR) submit the questionnaire with unanswered responses?',
        header: 'Confirmation',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.survey.completeLastPage();
        },
        reject: () => {
          this.onPreviewClick();
          console.log('Cancel clicked');
        },
      });
    } else {
      console.log('All the questions are answered');
      this.confirmationService.confirm({
        message: 'Would you like to submit the questionnaire?',
        header: 'Confirmation',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.survey.completeLastPage();
        },
        reject: () => {
          this.onPreviewClick();
          console.log('Cancel clicked');
        },
      });
    }

  }

  hasUnAnsweredQuestions() {
    let hasUnAnsweredQuestion = false;

    const allQuestions: Array<Question> = this.survey.getAllQuestions();

    for (const question of allQuestions) {
      console.log('question..' + JSON.stringify(question));
      if (question.getType() !== 'image' && question.getType() !== 'html') {

        if (question.getType() === 'matrix') {
          for (const row of question.rows) {
            const rowVal: ItemValue = row;
            console.log('rowval..', rowVal.value);
            if (!question.value[rowVal.value]) {
              hasUnAnsweredQuestion = true;
              break;
            }
          }
        } else {

          const visibleIf = question.visibleIf;
          if (visibleIf) {
            const runCondition = this.survey.runCondition(visibleIf);
            if (runCondition) {
              if (!question.isAnswered) {
                hasUnAnsweredQuestion = true;
                break;
              }
            }
          } else {
            if (question.visible) {
              if (!question.isAnswered) {
                hasUnAnsweredQuestion = true;
                break;
              }
            }

          }
        }

      }

    }
    return hasUnAnsweredQuestion;
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  showPrevious(): boolean {
    //console.log('current state.'+this.survey.state);
    return (undefined !== this.survey && this.survey.state === 'preview') || this.readonlyMode;
  }

  showNext(): boolean {
    //console.log('current state.'+this.survey.state);
    return (undefined !== this.survey && this.survey.state === 'preview') || this.readonlyMode
      || (undefined !== this.survey && this.survey.isLastPage);
  }

  showPreview(): boolean {
    //console.log('current state.'+this.survey.state);
    return (undefined !== this.survey && !this.survey.isLastPage) || this.readonlyMode;
  }

  showComplete(): boolean {
    // console.log('current state.'+this.survey.state);
    return (undefined !== this.survey && !this.survey.isLastPage) || this.readonlyMode;
    ;
  }
}

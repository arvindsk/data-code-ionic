import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import 'inputmask/dist/inputmask/phone-codes/phone';
import {init as initCustomWidget} from './customwidget';
import $ from "jquery";
import * as Survey from 'survey-angular';
import {SurveyModel} from 'survey-angular';
import * as widgets from 'surveyjs-widgets';
import "easy-autocomplete/dist/easy-autocomplete.css";

import 'bootstrap/dist/css/bootstrap.css';
import 'survey-angular/survey.css';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdaptService} from "../../services/adapt.service";
import {ParticipantStudy} from "../../model/ParticipantStudy";
import {Observable} from "rxjs";
import {DataStorageService} from "../../services/data-storage.service";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

//widgets.bootstrapslider(Survey);
//widgets.prettycheckbox(Survey);
//widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
//widgets.jquerybarrating(Survey);
//widgets.jqueryuidatepicker(Survey);
//widgets.nouislider(Survey);
//widgets.select2tagbox(Survey);
//widgets.sortablejs(Survey);
//widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
//widgets.bootstrapslider(Survey);
//idgets.prettycheckbox(Survey);
initCustomWidget(Survey);

Survey.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
Survey.JsonObject.metaData.addProperty('page', 'popupdescription:text');
import "survey-angular/modern.css";

Survey.StylesManager.applyTheme("modern");


@Component({
  selector: 'app-questionnaire',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  @Output() submitSurvey = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  result: any;
  json: any;
  survey;
  faInfoCircle = faInfoCircle;

  storageName = 'survey_patient_history';
  userId = 'Test';
  openDesc;
  closeResult = '';
  navigationUrl='';
  participantStudy: ParticipantStudy;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private modal: NgbModal,
              private adaptService: AdaptService,
              private dataStorageService: DataStorageService) {
    //this.json = json;
  }

  ngOnInit() {
    let defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "#5D001E";
    defaultThemeColors["$main-hover-color"] = "#5D001E";
    defaultThemeColors["$text-color"] = "#4a4a4a";
    defaultThemeColors["$header-color"] = "#5D001E";
    defaultThemeColors["$header-background-color"] = "#4a4a4a";
    defaultThemeColors["$body-container-background-color"] = "#f8f8f8";
    Survey.StylesManager.applyTheme();
    this.participantStudy=new ParticipantStudy();
    widgets.inputmask(Survey);
    this.participantStudy = this.dataStorageService.storage.participantStudy;
    this.navigationUrl='/adapt/participant/'+this.participantStudy.timeline.toLowerCase()+'?participantId='+this.participantStudy.participantId;
    this.adaptService.getQuestionnaire(this.participantStudy.studyName).subscribe((data: any) => {
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
    this.survey.showPreviewBeforeComplete = 'showAllQuestions';
    this.survey.navigateToUrl=this.navigationUrl;
    if ('Completed' === this.participantStudy.status) {
      this.survey.mode = 'display';
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

  saveSurveyData(result: SurveyModel) {
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
      queryParams: { participantId: this.participantStudy.participantId }
    };
    const url='' +
      '' +
      ''+this.participantStudy.timeline.toLowerCase();
    void this.router.navigate([url],navigationExtras);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

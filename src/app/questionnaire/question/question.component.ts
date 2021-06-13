import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import 'inputmask/dist/inputmask/phone-codes/phone';
import {init as initCustomWidget} from './customwidget';

import * as Survey from 'survey-angular';
import {SurveyModel} from 'survey-angular';
import * as widgets from 'surveyjs-widgets';

import 'bootstrap/dist/css/bootstrap.css';
import 'survey-angular/survey.css';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdaptService} from "../../services/adapt.service";
import {ParticipantStudy} from "../../model/ParticipantStudy";
import {Observable} from "rxjs";

widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);
widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);
initCustomWidget(Survey);

Survey.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
Survey.JsonObject.metaData.addProperty('page', 'popupdescription:text');
Survey.StylesManager.applyTheme('default');


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

  storageName = 'survey_patient_history';
  userId = 'Test';
  openDesc;
  closeResult = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private modal: NgbModal,
              private adaptService: AdaptService) {
    //this.json = json;
  }

  ngOnInit() {
    widgets.inputmask(Survey);

    this.adaptService.getQuestionnaire('vascular').subscribe((data: any) => {
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
      const btn = document.createElement('button');
      btn.className = 'btn btn-info btn-xs';
      btn.innerHTML = 'More Info';
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

    this.loadPreviousData().subscribe((prevData: ParticipantStudy) => {
      if (prevData !== null && prevData !== undefined) {
        if(prevData.studyInformation){
          const data = JSON.parse(prevData.studyInformation);
          this.survey.data = data;
          if (data.pageNo) {
            this.survey.currentPageNo = data.pageNo;
          }
        }

      }
      Survey.SurveyNG.render('surveyElement', {model: this.survey});
    });
    /*    const prevData = window.localStorage.getItem(this.storageName) || null;
        if (prevData) {
          const data = JSON.parse(prevData);
          this.survey.data = data;
          if (data.pageNo) {
            this.survey.currentPageNo = data.pageNo;
          }
        }*/
    // this.setupPageSelector(this.survey);
    // this.doOnCurrentPageChanged(this.survey);

  }

  loadPreviousData(): Observable<ParticipantStudy> {
    const participantStudy: ParticipantStudy = new ParticipantStudy();
    participantStudy.studyId = 1001;
    participantStudy.patientId = '12310';
    return this.adaptService.getQuestionnaireAnswer(participantStudy);
  }

  saveSurveyData(result: SurveyModel) {
    const data = result.data;
    data.pageNo = result.currentPageNo;
    const participantStudy: ParticipantStudy = new ParticipantStudy();
    participantStudy.studyId = 1001;
    participantStudy.studyInformation = JSON.stringify(data);
    participantStudy.status = result.state;
    participantStudy.patientId = '12310';
    participantStudy.participantStudyId = 2;

    this.adaptService.saveQuestionnaireAnswer(participantStudy).subscribe((resultData: string) => {
      if (resultData === 'success') {
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

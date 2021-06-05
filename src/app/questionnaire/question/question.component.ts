import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import 'inputmask/dist/inputmask/phone-codes/phone';
import json from '../../../assets/vascular.json';

import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';

import 'bootstrap/dist/css/bootstrap.css';
import 'survey-angular/survey.css';
import {ActivatedRoute, Router} from "@angular/router";

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
Survey.StylesManager.applyTheme('bootstrap');


@Component({
  selector: 'app-questionnaire',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  result: any;
  json: any;

  storageName = 'survey_patient_history';
  userId = "Test";

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.json = json;
  }

  ngOnInit() {
    widgets.inputmask(Survey);

    const survey = new Survey.Model(this.json);
    survey.sendResultOnPageNext = true;
    survey.onPartialSend.add((result, options) => {
      console.log('next button click triggered' + result);
      this.submitSurvey.emit(result.data);
      this.result = result.data;
      this.saveSurveyData(result);
    });
    survey.onComplete.add((onCompleteResult, options) => {
      console.log('complete button click triggered' + onCompleteResult);
      this.saveSurveyData(onCompleteResult);
    });

    const prevData = window.localStorage.getItem(this.storageName) || null;
    if (prevData) {
      const data = JSON.parse(prevData);
      survey.data = data;
      if (data.pageNo) {
        survey.currentPageNo = data.pageNo;
      }
    }
    Survey.SurveyNG.render('surveyElement', {model: survey});
  }

  saveSurveyData(question: any) {
    const data = question.data;
    data.pageNo = question.currentPageNo;
    window.localStorage.setItem(this.storageName, JSON.stringify(data));

  }

  public summary(): void {
    void this.router.navigate(['home']);
  }

  public collect(): void {
    void this.router.navigate(['home']);
  }
}

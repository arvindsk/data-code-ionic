import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireRoutingModule} from './questionnaire-routing.module';
import {QuestionComponent} from './question/question.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    IonicModule
  ]
})
export class QuestionnaireModule {
}

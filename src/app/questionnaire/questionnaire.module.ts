import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireRoutingModule} from './questionnaire-routing.module';
import {QuestionComponent} from './question/question.component';
import {IonicModule} from '@ionic/angular';
import {ButtonModule} from "../shared/button/button.module";


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    IonicModule,
    ButtonModule,

  ]
})
export class QuestionnaireModule {
}

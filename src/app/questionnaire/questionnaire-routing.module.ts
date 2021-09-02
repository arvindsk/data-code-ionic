import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionComponent} from './question/question.component';
import {DirectAccessGuard} from '../services/direct-access.guard';
import {QuestionnaireValidatorComponent} from './questionnaire-validator/questionnaire-validator.component';


const routes: Routes = [
  {
    path: '',
    component: QuestionComponent
  },
  {
    path: 'email',
    component: QuestionnaireValidatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule {}

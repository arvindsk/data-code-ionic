import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireRoutingModule} from './questionnaire-routing.module';
import {QuestionComponent} from './question/question.component';
import {IonicModule} from '@ionic/angular';
import {ButtonModule} from "../shared/button/button.module";
import {HeaderModule} from "../shared/header/header.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TableModule} from "primeng";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    IonicModule,
    ButtonModule,
    HeaderModule,
    NgbModule,
    TableModule,
    FontAwesomeModule,
    MatIconModule
  ]
})
export class QuestionnaireModule {
}

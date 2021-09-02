import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireRoutingModule} from './questionnaire-routing.module';
import {QuestionComponent} from './question/question.component';
import {IonicModule} from '@ionic/angular';
import {ButtonModule} from '../shared/button/button.module';
import {HeaderModule} from '../shared/header/header.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {QuestionnaireValidatorComponent} from "./questionnaire-validator/questionnaire-validator.component";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [QuestionComponent,QuestionnaireValidatorComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    IonicModule,
    ButtonModule,
    HeaderModule,
    NgbModule,
    TableModule,
    MatIconModule,
    MatButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionnaireModule {
}

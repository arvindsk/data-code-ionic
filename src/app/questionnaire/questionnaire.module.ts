import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireRoutingModule} from './questionnaire-routing.module';
import {QuestionComponent} from './question/question.component';
import {IonicModule} from '@ionic/angular';
import {ButtonModule} from "../shared/button/button.module";
import {HeaderModule} from "../shared/header/header.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TableModule} from "primeng";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


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
        MatIconModule,
        MatButtonModule
    ]
})
export class QuestionnaireModule {
}

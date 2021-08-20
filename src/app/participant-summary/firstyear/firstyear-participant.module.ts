import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstyearParticipantRoutingModule } from './firstyear-participant-routing.module';

import { FirstyearParticipantComponent } from './firstyear-participant.component';
import {TableModule} from 'primeng/table';
import {MaterialModule} from "../../material-module";
import {MessagesModule} from "primeng/messages";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FirstyearParticipantRoutingModule,
        TableModule,
        MaterialModule,
        MessagesModule,
        ConfirmDialogModule,
    ],
  declarations: [FirstyearParticipantComponent]
})
export class FirstyearParticipantModule {}

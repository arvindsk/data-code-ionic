import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaselineParticipantRoutingModule } from './baseline-participant-routing.module';

import { BaselineParticipantComponent } from './baseline-participant.component';
import {TableModule} from 'primeng/table';
import {MaterialModule} from '../../material-module';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BaselineParticipantRoutingModule,
        TableModule,
        MaterialModule,
        MessagesModule,
        ToastModule,
        ConfirmDialogModule,
    ],
  declarations: [BaselineParticipantComponent]
})
export class BaselineParticipantModule {}

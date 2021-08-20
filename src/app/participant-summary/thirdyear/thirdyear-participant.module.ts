import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdyearParticipantRoutingModule } from './thirdyear-participant-routing.module';

import { ThirdyearParticipantComponent } from './thirdyear-participant.component';
import {TableModule} from 'primeng/table';
import {MaterialModule} from '../../material-module';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThirdyearParticipantRoutingModule,
        TableModule,
        MaterialModule,
        MessagesModule,
    ToastModule,
        ConfirmDialogModule,
    SidebarModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
    ],
  declarations: [ThirdyearParticipantComponent]
})
export class ThirdyearParticipantModule {}

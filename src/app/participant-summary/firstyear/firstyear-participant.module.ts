import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstyearParticipantRoutingModule } from './firstyear-participant-routing.module';

import { FirstyearParticipantComponent } from './firstyear-participant.component';
import {TableModule} from 'primeng/table';
import {MaterialModule} from "../../material-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstyearParticipantRoutingModule,
    TableModule,
    MaterialModule,
  ],
  declarations: [FirstyearParticipantComponent]
})
export class FirstyearParticipantModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaselineParticipantRoutingModule } from './baseline-participant-routing.module';

import { BaselineParticipantComponent } from './baseline-participant.component';
import {TableModule} from 'primeng';
import {MaterialModule} from '../../material-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaselineParticipantRoutingModule,
    TableModule,
    MaterialModule,
  ],
  declarations: [BaselineParticipantComponent]
})
export class BaselineParticipantModule {}

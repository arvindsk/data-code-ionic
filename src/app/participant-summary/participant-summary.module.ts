import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {ParticipantSummaryRoutingModule} from './participant-summary-routing.module';

import {TableModule} from "primeng";
import {HeaderModule} from "../shared/header/header.module";
import {BaselineParticipantRoutingModule} from "./baseline/baseline-participant-routing.module";
import {ThirdyearParticipantRoutingModule} from "./thirdyear/thirdyear-participant-routing.module";
import {ParticipantSummaryComponent} from "./participant-summary.component";
import {BaselineParticipantModule} from "./baseline/baseline-participant.module";
import {FirstyearParticipantModule} from "./firstyear/firstyear-participant.module";
import {FirstyearParticipantRoutingModule} from "./firstyear/firstyear-participant-routing.module";
import {ThirdyearParticipantModule} from "./thirdyear/thirdyear-participant.module";

@NgModule({
  "imports": [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantSummaryRoutingModule,
    TableModule,
    BaselineParticipantModule,
    FirstyearParticipantModule,
    ThirdyearParticipantModule,
    BaselineParticipantRoutingModule,
    FirstyearParticipantRoutingModule,
    ThirdyearParticipantRoutingModule,
    HeaderModule,
  ],
  declarations: [ParticipantSummaryComponent]
})
export class ParticipantSummaryModule {}

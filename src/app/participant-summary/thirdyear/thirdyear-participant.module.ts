import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdyearParticipantRoutingModule } from './thirdyear-participant-routing.module';

import { ThirdyearParticipantComponent } from './thirdyear-participant.component';
import {TableModule} from "primeng";
import {MaterialModule} from "../../material-module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThirdyearParticipantRoutingModule,
        TableModule,
        MaterialModule,
    ],
  declarations: [ThirdyearParticipantComponent]
})
export class ThirdyearParticipantModule {}

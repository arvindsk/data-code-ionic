import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdyearParticipantRoutingModule } from './thirdyear-participant-routing.module';

import { ThirdyearParticipantComponent } from './thirdyear-participant.component';
import {TableModule} from 'primeng/table';
import {MaterialModule} from "../../material-module";
import {MessagesModule} from "primeng/messages";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThirdyearParticipantRoutingModule,
        TableModule,
        MaterialModule,
        MessagesModule,
    ],
  declarations: [ThirdyearParticipantComponent]
})
export class ThirdyearParticipantModule {}

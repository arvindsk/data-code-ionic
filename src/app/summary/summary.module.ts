import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {SummaryRoutingModule} from './summary-routing.module';

import { SummaryComponent } from './summary.component';
import {TableModule} from "primeng";
import {BaselineSummaryModule} from "./baseline/baseline-summary.module";
import {FirstyearSummaryModule} from "./firstyear/firstyear-summary.module";
import {ThirdyearSummaryModule} from "./thirdyear/thirdyear-summary.module";
import {BaselineSummaryRoutingModule} from "./baseline/baseline-summary-routing.module";
import {FirstyearSummaryRoutingModule} from "./firstyear/firstyear-summary-routing.module";
import {ThirdyearSummaryRoutingModule} from "./thirdyear/thirdyear-summary-routing.module";
import {HeaderModule} from "../shared/header/header.module";
import {MaterialModule} from "../material-module";

@NgModule({
  "imports": [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryRoutingModule,
    TableModule,
    BaselineSummaryModule,
    FirstyearSummaryModule,
    ThirdyearSummaryModule,
    BaselineSummaryRoutingModule,
    FirstyearSummaryRoutingModule,
    ThirdyearSummaryRoutingModule,
    HeaderModule,
    MaterialModule,
  ],
  declarations: [SummaryComponent]
})
export class SummaryModule {}

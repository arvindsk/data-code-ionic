import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdyearSummaryRoutingModule } from './thirdyear-summary-routing.module';

import { ThirdyearSummaryComponent } from './thirdyear-summary.component';
import {TableModule} from "primeng";
import {MaterialModule} from "../../material-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThirdyearSummaryRoutingModule,
    TableModule,
    MaterialModule,
  ],
  declarations: [ThirdyearSummaryComponent]
})
export class ThirdyearSummaryModule {}

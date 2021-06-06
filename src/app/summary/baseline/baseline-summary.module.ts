import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaselineSummaryRoutingModule } from './baseline-summary-routing.module';

import { BaselineSummaryComponent } from './baseline-summary.component';
import {TableModule} from "primeng";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaselineSummaryRoutingModule,
    TableModule,
  ],
  declarations: [BaselineSummaryComponent]
})
export class BaselineSummaryModule {}

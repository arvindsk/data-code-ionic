import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstyearSummaryRoutingModule } from './firstyear-summary-routing.module';

import { FirstyearSummaryComponent } from './firstyear-summary.component';
import {TableModule} from 'primeng/table';
import {MaterialModule} from '../../material-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstyearSummaryRoutingModule,
    TableModule,
    MaterialModule,
  ],
  declarations: [FirstyearSummaryComponent]
})
export class FirstyearSummaryModule {}

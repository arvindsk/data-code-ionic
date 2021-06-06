import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstyearSummaryComponent } from './firstyear-summary.component';

const routes: Routes = [
  {
    path: '',
    component: FirstyearSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstyearSummaryRoutingModule {}

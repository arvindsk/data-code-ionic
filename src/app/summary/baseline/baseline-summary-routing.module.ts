import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaselineSummaryComponent } from './baseline-summary.component';

const routes: Routes = [
  {
    path: '',
    component: BaselineSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaselineSummaryRoutingModule {}

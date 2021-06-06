import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdyearSummaryComponent } from './thirdyear-summary.component';

const routes: Routes = [
  {
    path: '',
    component: ThirdyearSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdyearSummaryRoutingModule {}

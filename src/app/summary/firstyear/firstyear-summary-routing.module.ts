import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstyearSummaryComponent } from './firstyear-summary.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: FirstyearSummaryComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstyearSummaryRoutingModule {}

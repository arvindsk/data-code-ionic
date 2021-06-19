import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaselineSummaryComponent } from './baseline-summary.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: BaselineSummaryComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaselineSummaryRoutingModule {}

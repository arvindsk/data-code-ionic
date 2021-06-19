import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdyearSummaryComponent } from './thirdyear-summary.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: ThirdyearSummaryComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdyearSummaryRoutingModule {}

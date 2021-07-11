import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstyearCollectDataComponent } from './firstyear-collectdata.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: FirstyearCollectDataComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstyearCollectDataRoutingModule {}

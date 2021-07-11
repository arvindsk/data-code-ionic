import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaselineCollectDataComponent } from './baseline-collectdata.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: BaselineCollectDataComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaselineCollectDataRoutingModule {}

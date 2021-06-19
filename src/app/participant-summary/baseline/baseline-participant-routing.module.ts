import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaselineParticipantComponent } from './baseline-participant.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: BaselineParticipantComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaselineParticipantRoutingModule {}

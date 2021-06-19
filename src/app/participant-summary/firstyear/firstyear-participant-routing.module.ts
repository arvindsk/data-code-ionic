import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstyearParticipantComponent } from './firstyear-participant.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: FirstyearParticipantComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstyearParticipantRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstyearParticipantComponent } from './firstyear-participant.component';

const routes: Routes = [
  {
    path: '',
    component: FirstyearParticipantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstyearParticipantRoutingModule {}

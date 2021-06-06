import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaselineParticipantComponent } from './baseline-participant.component';

const routes: Routes = [
  {
    path: '',
    component: BaselineParticipantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaselineParticipantRoutingModule {}

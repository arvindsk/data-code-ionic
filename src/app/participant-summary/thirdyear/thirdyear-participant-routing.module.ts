import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdyearParticipantComponent } from './thirdyear-participant.component';

const routes: Routes = [
  {
    path: '',
    component: ThirdyearParticipantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdyearParticipantRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantSummaryComponent } from './participant-summary.component';

const routes: Routes = [
  {
    path: '',
    component: ParticipantSummaryComponent,
    children: [
    {
      path: 'baseline',
      children: [
        {
          path: '',
          loadChildren: () => import('./baseline/baseline-participant.module').then(m => m.BaselineParticipantModule)
        }
      ]
    },
    {
      path: 'firstyear',
      children: [
        {
          path: '',
          loadChildren: () => import('./firstyear/firstyear-participant.module').then(m => m.FirstyearParticipantModule)
        }
      ]
    },
    {
      path: 'thirdyear',
      children: [
        {
          path: '',
          loadChildren: () => import('./thirdyear/thirdyear-participant.module').then(m => m.ThirdyearParticipantModule)
        }
      ]
    },
    {
      path: '',
      redirectTo: '/adapt/participant/baseline',
      pathMatch: 'full'
    }
    ]
  },
  {
    path: '',
    redirectTo: '/adapt/participant/baseline',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantSummaryRoutingModule {}

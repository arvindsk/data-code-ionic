import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryComponent } from './summary.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent,
    children: [
    {
      path: 'baseline',
      children: [
        {
          path: '',
          loadChildren: () => import('./baseline/baseline-summary.module').then(m => m.BaselineSummaryModule)
        }
      ]
    },
    {
      path: 'firstyear',
      children: [
        {
          path: '',
          loadChildren: () => import('./firstyear/firstyear-summary.module').then(m => m.FirstyearSummaryModule)
        }
      ]
    },
    {
      path: 'thirdyear',
      children: [
        {
          path: '',
          loadChildren: () => import('./thirdyear/thirdyear-summary.module').then(m => m.ThirdyearSummaryModule)
        }
      ]
    },
    {
      path: '',
      redirectTo: '/adapt/summary/baseline',
      pathMatch: 'full'
    }
    ]
  },
  {
    path: '',
    redirectTo: '/adapt/summary/baseline',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryRoutingModule {}

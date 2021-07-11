import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectDataComponent } from './collect-data.component';
import {DirectAccessGuard} from "../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: CollectDataComponent,
    children: [
    {
      path: 'baseline',
      children: [
        {
          path: '',
          loadChildren: () => import('./baseline/baseline-collectdata.module').then(m => m.BaselineCollectDataModule)
        }
      ]
    },
    {
      path: 'firstyear',
      children: [
        {
          path: '',
          loadChildren: () => import('./firstyear/firstyear-collectdata.module').then(m => m.FirstyearCollectDataModule)
        }
      ]
    },
    {
      path: 'thirdyear',
      children: [
        {
          path: '',
          loadChildren: () => import('./thirdyear/thirdyear-collectdata.module').then(m => m.ThirdyearCollectDataModule)
        }
      ]
    },
    {
      path: '',
      redirectTo: '/adapt/collect-data/baseline',
      pathMatch: 'full'
    }
    ], canActivate: [DirectAccessGuard]
  },
  {
    path: '',
    redirectTo: '/adapt/collect-data/baseline',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectDataRoutingModule {}

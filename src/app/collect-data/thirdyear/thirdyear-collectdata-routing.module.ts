import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdyearCollectDataComponent } from './thirdyear-collectdata.component';
import {DirectAccessGuard} from "../../services/direct-access.guard";

const routes: Routes = [
  {
    path: '',
    component: ThirdyearCollectDataComponent,
    canActivate: [DirectAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdyearCollectDataRoutingModule {}

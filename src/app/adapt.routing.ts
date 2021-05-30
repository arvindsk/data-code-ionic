import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
//import {AdaptLoginComponent} from "./adapt-login/adapt-login.component";
//import {AdaptNavbarComponent} from "./adapt-navbar/adapt-navbar.component";
import {AdaptSummaryComponent} from "./adapt-summary/adapt-summary.component";

export const routes: Routes = [
  //{ path: '', component: AdaptLoginComponent },
  //{ path: 'login', component: AdaptNavbarComponent },
  { path: 'summary', component: AdaptSummaryComponent },

]

export const AdaptRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes)

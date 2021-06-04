import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
//import {AdaptLoginComponent} from "./adapt-login/adapt-login.component";
//import {AdaptNavbarComponent} from "./adapt-navbar/adapt-navbar.component";
import {AdaptSummaryComponent} from "./adapt-summary/adapt-summary.component";
import {HomePage} from "./home/home.page";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  //{ path: '', component: AdaptLoginComponent },
  { path: 'home', component: HomePage },
  { path: 'summary', component: AdaptSummaryComponent },
  { path: 'login', component: LoginComponent },

]

export const AdaptRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes)

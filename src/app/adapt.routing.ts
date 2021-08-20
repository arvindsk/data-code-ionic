import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomePage} from './home/home.page';
import {LoginComponent} from './login/login.component';
import {DirectAccessGuard} from './services/direct-access.guard';

export const routes: Routes = [
  //{ path: '', component: AdaptLoginComponent },
  {path: 'adapt/home', component: HomePage, canActivate: [DirectAccessGuard]},
  {
    path: 'adapt/collect-data/participant',
    loadChildren: () => import('./participant-summary/participant-summary.module').then(m => m.ParticipantSummaryModule)
  },
  {
    path: 'adapt/collect-data',
    loadChildren: () => import('./collect-data/collect-data.module').then(m => m.CollectDataModule)
  },
  {
    path: 'adapt/summary',
    loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule)
  },
  {path: 'adapt/login', component: LoginComponent, canActivate: [DirectAccessGuard]},

  {
    path: 'adapt/collect-data/participant/questionnaire',
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)
  }
];

export const AdaptRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

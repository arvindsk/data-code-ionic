import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SummaryComponent} from './summary/summary.component';
import {HomePage} from './home/home.page';
import {LoginComponent} from './login/login.component';
import {CollectDataComponent} from "./collect-data/collect-data.component";

export const routes: Routes = [
  //{ path: '', component: AdaptLoginComponent },
  {path: 'adapt/home', component: HomePage},
  {path: 'adapt/participant',
    loadChildren: () => import('./participant-summary/participant-summary.module').then(m => m.ParticipantSummaryModule)
  },
  {path: 'adapt/collect-data', component: CollectDataComponent},
  {path: 'adapt/summary',
    loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule)
  },
  {path: 'adapt/collectdata', component: CollectDataComponent},
  {path: 'adapt/login', component: LoginComponent},

  {
    path: 'adapt/questionnaire',
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)
  }
];

export const AdaptRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

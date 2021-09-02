import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NonAuthGuard} from './services/non-auth.guard';
import {ExpiredComponent} from './expired/expired.component';
import {ThankYouPageComponent} from "./thank-you-page/thank-you-page.component";

const routes: Routes = [
  {
    path: 'questionnaire',
    canActivate: [NonAuthGuard],
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)
  },
  {
    path: 'expired',
    canActivate: [NonAuthGuard],
    component:ExpiredComponent
  },
  {
    path: 'thank-you',
    canActivate: [NonAuthGuard],
    component:ThankYouPageComponent
  },
  {
    path: 'adapt',
    loadChildren: () => import('./adapt.module').then(m => m.AdaptModule)
  },
  {
    path: '',
    redirectTo: 'adapt/login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

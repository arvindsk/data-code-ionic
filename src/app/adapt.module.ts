import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdaptRouting} from './adapt.routing';

import {HttpClientModule} from '@angular/common/http';

import {IonicModule} from '@ionic/angular';
import {HomePage} from './home/home.page';
import {ButtonModule} from './shared/button/button.module';
import {LoginComponent} from './login/login.component';
import {InputModule} from './shared/input/input.module';
import {CollectDataComponent} from './collect-data/collect-data.component';
import {ParticipantSummaryComponent} from './participant-summary/participant-summary.component';
import {SummaryModule} from './summary/summary.module';
import {HeaderModule} from './shared/header/header.module';
import {FlyoutModule} from './shared/flyout/flyout.module';
import {MaterialModule} from './material-module';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';



@NgModule({
    imports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptRouting,
            ButtonModule,
            HttpClientModule,
            ToastModule,
            AccordionModule,
            IonicModule,
            InputModule,
            TableModule,
            HeaderModule,
            FlyoutModule,
            MaterialModule

        ],

  declarations:
    [
      HomePage,
      LoginComponent,
    ],

  exports:
    [
      //AdaptLoginComponent,

    ],

  schemas:
    [
      CUSTOM_ELEMENTS_SCHEMA
    ]

})
export class AdaptModule {}

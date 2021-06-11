import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdaptRouting} from "./adapt.routing";
import {AccordionModule, PanelModule, TableModule, TabViewModule} from "primeng";
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from "primeng";
import {IonicModule} from "@ionic/angular";
import {HomePage} from "./home/home.page";
import {ButtonModule} from "./shared/button/button.module";
import {LoginComponent} from "./login/login.component";
import {InputModule} from "./shared/input/input.module";
import {CollectDataComponent} from "./collect-data/collect-data.component";
import {ParticipantSummaryComponent} from "./participant-summary/participant-summary.component";
import {SummaryModule} from "./summary/summary.module";
import {HeaderModule} from "./shared/header/header.module";
import {FlyoutModule} from "./shared/flyout/flyout.module";


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
      TabViewModule,
      IonicModule,
      InputModule,
      PanelModule,
      TableModule,
      HeaderModule,
      FlyoutModule,


    ],

  declarations:
    [
      CollectDataComponent,
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

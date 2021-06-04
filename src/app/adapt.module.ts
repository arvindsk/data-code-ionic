import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
//import {AdaptLoginComponent} from "./adapt-login/adapt-login.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdaptRouting} from "./adapt.routing";
//import { AdaptNavbarComponent } from './adapt-navbar/adapt-navbar.component';
import { AdaptSummaryComponent } from './adapt-summary/adapt-summary.component';
//import { AdaptCollectdataComponent } from './adapt-collectdata/adapt-collectdata.component';
//import { AdaptFooterComponent } from './adapt-footer/adapt-footer.component';
import {AccordionModule, PanelModule, TabViewModule} from "primeng";
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from "primeng";
import {ToastModule} from "primeng";
import {IonicModule} from "@ionic/angular";
import {HomePage} from "./home/home.page";
import {ButtonModule} from "./shared/button/button.module";
import {LoginComponent} from "./login/login.component";
import {InputModule} from "./shared/input/input.module";
import {AdaptCollectDataComponent} from "./adapt-collect-data/adapt-collect-data.component";



@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AdaptRouting,
      ButtonModule,
      HttpClientModule,
      TableModule,
      ToastModule,
      AccordionModule,
      TabViewModule,
      IonicModule,
      InputModule,
      PanelModule


    ],

  declarations:
    [
  //  AdaptLoginComponent,
    AdaptCollectDataComponent,
    AdaptSummaryComponent,
      HomePage,
      LoginComponent,
    //AdaptCollectdataComponent,
    //AdaptFooterComponent
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

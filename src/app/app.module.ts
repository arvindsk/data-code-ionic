import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { AdaptModule } from "./adapt.module";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ButtonModule} from "./shared/button/button.module";
import {InputModule} from "./shared/input/input.module";
import {TableModule} from "primeng";
import {HeaderModule} from "./shared/header/header.module";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AdaptModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,
    AccordionModule,IonicModule, ButtonModule, InputModule, TableModule, HeaderModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [ ]
})
export class AppModule {}

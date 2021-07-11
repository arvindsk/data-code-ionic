import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaselineCollectDataRoutingModule } from './baseline-collectdata-routing.module';

import { BaselineCollectDataComponent } from './baseline-collectdata.component';
import {TableModule, ToastModule} from 'primeng';
import {MaterialModule} from '../../material-module';
import {FlyoutModule} from "../../shared/flyout/flyout.module";
import {InputModule} from "../../shared/input/input.module";
import {ButtonModule} from "../../shared/button/button.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaselineCollectDataRoutingModule,
    TableModule,
    MaterialModule,
    FlyoutModule,
    ToastModule,
    InputModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [BaselineCollectDataComponent]
})
export class BaselineCollectDataModule {}

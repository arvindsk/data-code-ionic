import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstyearCollectDataRoutingModule } from './firstyear-collectdata-routing.module';

import { FirstyearCollectDataComponent } from './firstyear-collectdata.component';
import {MaterialModule} from '../../material-module';
import {FlyoutModule} from '../../shared/flyout/flyout.module';
import {InputModule} from '../../shared/input/input.module';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstyearCollectDataRoutingModule,
    TableModule,
    MaterialModule,
    FlyoutModule,
    ToastModule,
    InputModule,
    ButtonModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
  ],
  declarations: [FirstyearCollectDataComponent]
})
export class FirstyearCollectDataModule {}

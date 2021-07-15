import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdyearCollectDataRoutingModule } from './thirdyear-collectdata-routing.module';

import { ThirdyearCollectDataComponent } from './thirdyear-collectdata.component';
import {TableModule} from 'primeng/table';
import {MaterialModule} from '../../material-module';
import {FlyoutModule} from '../../shared/flyout/flyout.module';
import {InputModule} from '../../shared/input/input.module';
import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThirdyearCollectDataRoutingModule,
        TableModule,
        MaterialModule,
        FlyoutModule,
        ToastModule,
        InputModule,
        ButtonModule,
        ReactiveFormsModule,
        SidebarModule,
    ],
  declarations: [ThirdyearCollectDataComponent]
})
export class ThirdyearCollectDataModule {}

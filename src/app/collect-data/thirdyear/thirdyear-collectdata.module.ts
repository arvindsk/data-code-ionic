import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdyearCollectDataRoutingModule } from './thirdyear-collectdata-routing.module';

import { ThirdyearCollectDataComponent } from './thirdyear-collectdata.component';
import {TableModule, ToastModule} from "primeng";
import {MaterialModule} from "../../material-module";
import {FlyoutModule} from "../../shared/flyout/flyout.module";
import {InputModule} from "../../shared/input/input.module";
import {ButtonModule} from "../../shared/button/button.module";

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
    ],
  declarations: [ThirdyearCollectDataComponent]
})
export class ThirdyearCollectDataModule {}

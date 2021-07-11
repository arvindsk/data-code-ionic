import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {CollectDataRoutingModule} from './collect-data-routing.module';

import {TableModule} from "primeng";
import {HeaderModule} from "../shared/header/header.module";
import {BaselineCollectDataRoutingModule} from "./baseline/baseline-collectdata-routing.module";
import {ThirdyearCollectDataRoutingModule} from "./thirdyear/thirdyear-collectdata-routing.module";
import {CollectDataComponent} from "./collect-data.component";
import {BaselineCollectDataModule} from "./baseline/baseline-collectdata.module";
import {FirstyearCollectDataModule} from "./firstyear/firstyear-collectdata.module";
import {FirstyearCollectDataRoutingModule} from "./firstyear/firstyear-collectdata-routing.module";
import {ThirdyearCollectDataModule} from "./thirdyear/thirdyear-collectdata.module";
import {FlyoutModule} from "../shared/flyout/flyout.module";
import {MaterialModule} from "../material-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableModule,
    FlyoutModule,
    CollectDataRoutingModule,
    BaselineCollectDataModule,
    FirstyearCollectDataModule,
    ThirdyearCollectDataModule,
    BaselineCollectDataRoutingModule,
    FirstyearCollectDataRoutingModule,
    ThirdyearCollectDataRoutingModule,
    HeaderModule,
    MaterialModule,
  ],
  declarations: [CollectDataComponent]
})
export class CollectDataModule {}

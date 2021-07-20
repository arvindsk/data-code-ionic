import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, IonicModule, CommonModule, RouterModule,UiSwitchModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {}

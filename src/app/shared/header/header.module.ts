import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, IonicModule, CommonModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {}

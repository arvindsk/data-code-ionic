import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesome } from '../font-awesome/font-awesome.module';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputComponent } from './input.component';

@NgModule({
    imports: [FormsModule, FontAwesome, CommonModule, InputTextModule],
    exports: [InputComponent],
    declarations: [InputComponent],
})
export class InputModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlyoutComponent } from './flyout.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
    imports: [CommonModule, SidebarModule],
    declarations: [FlyoutComponent],
    exports: [FlyoutComponent],
})
export class FlyoutModule {}

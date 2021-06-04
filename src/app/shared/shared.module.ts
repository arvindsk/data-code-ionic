// https://angular.io/guide/styleguide#shared-feature-module
// A common shared module that hosts common shared controls - Stuff that could possibly be shared with other apps.
// Ex:  Input boxes, drop downs, etc.
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';

/* PrimeNg */
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OrderListModule } from 'primeng/orderlist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipsModule } from 'primeng/chips';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ScriptLoadedService } from './services/script-loaded/script-loaded.service';

//import { TableModule as ExpoTableModule } from '@shared/table-module/table.module';

import { FontAwesome } from './font-awesome/font-awesome.module';

import { InputModule } from './input/input.module';
import { ButtonModule } from './button/button.module';
//import { DropdownSelectModule } from 'expo-shared/dropdown-select';
import { DownloadLinkModule } from './download-link/download-link.module';
import { DropdownModule as DropdownModuleExpoShared } from './dropdown/dropdown.module'; // Name conflict with primeng
import { DropdownItemModule } from './dropdown-item/dropdown-item.module';
import { MenuItemService } from './dropdown-item/menu-item.service';

import { FlyoutModule } from './flyout/flyout.module';


@NgModule({
    imports: [
        RouterModule,
        CheckboxModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        TableModule,
        AccordionModule,
        DropdownModule,
        ToastModule,
        DialogModule,
        TooltipModule,
        OverlayPanelModule,
        InlineSVGModule.forRoot({ baseUrl: '/assets/images/' }),
        SidebarModule,

        AutoCompleteModule,
        MultiSelectModule,
        SelectButtonModule,
        CalendarModule,
        InputMaskModule,
        InputSwitchModule,
        OrderListModule,

        ChipsModule,
        ProgressBarModule,
        MessagesModule,
        MessageModule,
        //ExpoTableModule,
        DownloadLinkModule,


        FontAwesome,

        InputModule,
        ButtonModule,

        DropdownModuleExpoShared,
        DropdownItemModule,

        FlyoutModule

    ],
    declarations: [



    ],
    exports: [
        // Modules
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,

        AccordionModule,
        DropdownModule,
        ToastModule,
        TooltipModule,
        OverlayPanelModule,
        SelectButtonModule,

        //ExpoTableModule,


        DownloadLinkModule,

        FontAwesome,

        InputModule,
        ButtonModule,

        DropdownModuleExpoShared,
        DropdownItemModule,

        FlyoutModule

    ],
    providers: [MenuItemService],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [ScriptLoadedService],
        };
    }
}

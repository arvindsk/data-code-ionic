import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

type ButtonType = 'submit' | 'button';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    @Input() showArrow: Boolean = true;
    @Input() disabled: Boolean = false;
    @Input() type: ButtonType = 'button';
    @Input() visualState: String = '';
    @Input() alternateStyle: String = '';
    @Input() variationStyle: String = '';
    @Input() name: string; // this is required for IE11 submit buttons
    @Input() tooltip: String = '';
    @Input() disabledTooltip: String = '';

    @ViewChild('inputButton', { static: true }) inputButton: ElementRef;

    // ElementRef must be public - unit testing won't inject a type of ElementRef
    constructor(public elementRef: ElementRef) {}

    ngOnInit() {
        // necessary to ensure IE ignores (click) and routeLink event
        this.elementRef.nativeElement.addEventListener(
            'click',
            (e) => {
                if (this.disabled) {
                    e.stopPropagation();
                }
            },
            true
        );
    }
}

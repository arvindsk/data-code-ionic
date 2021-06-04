import { Component, EventEmitter, Input, Output, forwardRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
    @Output() clear: EventEmitter<void> = new EventEmitter<void>();
    @Input() _inputText = '';

    @Input() control: FormControl;
    @Input() validationMsgs: {
        required: string;
        pattern: string;
        email: string;
        noMatch: string;
        passwordPolicy: string;
        passwordDictionary: string;
        passwordHistory: string;
        passwordPersonalInfo: string;
        emptyInput: string;
    };

    @Input() isFormInput = true;
    @Input() name = '';
    @Input() placeholder = '';
    @Input() showClear: boolean;
    @Input() autocomplete = 'on';
    @Input() autofocus = false;

    @Input() inputLabel?: string;
    @Input() labelIcon = '';
    @Input() labelIconPrefix = 'fas';
    @Input() isRequiredLabelSuffix: boolean;

    @Input() hideInput = false;
    @Input() readOnly = false;
    @Input() v2Styles = false;

    @Input() characterCount = false;
    @Input() maxLength = 524288;

    @ViewChild('inputElementV2', { static: false }) inputElementV2: ElementRef;
    @ViewChild('inputElement', { static: false }) inputElement: ElementRef;

    propagateChange: Function = (_: any) => {};
    /* istanbul ignore next -- US292839 - if you are editing this file, try to add unit tests so this tag can be removed  */
    onTouched: Function = (_: any) => {};

    constructor() {}

    get inputText() {
        return this._inputText;
    }

    set inputText(val) {
        this._inputText = val;
        this.propagateChange(this._inputText);
    }
    /* istanbul ignore next -- US292839 - if you are editing this file, try to add unit tests so this tag can be removed  */
    ngAfterViewInit() {
        // Workaround as IE doesn't play well with autofocus on input fields
        if (this.autofocus && this.inputElementV2) {
            this.inputElementV2.nativeElement.focus();
        }

        if (this.autofocus && this.inputElement) {
            this.inputElement.nativeElement.focus();
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: any) {
        const normalizedValue = value == null ? '' : value;
        this._inputText = normalizedValue;
    }

    onClear() {
        this.inputText = '';
        this.clear.emit();
    }
}

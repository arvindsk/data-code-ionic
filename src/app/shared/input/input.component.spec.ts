import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { CountdownPipe } from '../countdown-pipe/countdown.pipe';

describe('InputComponent', () => {
    let component: InputComponent, fixture: ComponentFixture<InputComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [InputComponent, CountdownPipe],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('Methods', () => {
        describe('get inputText', () => {
            it('should return input text', () => {
                const expectedInputText = 'StlnqOZukk';
                component._inputText = expectedInputText;

                expect(component.inputText).toEqual(expectedInputText);
            });
        });

        describe('set inputText', () => {
            it('should properly set input text and propagate change', () => {
                const propagateChangeSpy = spyOn(component, 'propagateChange'),
                    expectedInputText = 'vZTZCin8ju';

                component.inputText = expectedInputText;

                expect(component._inputText).toEqual(expectedInputText);
                expect(propagateChangeSpy as any).toHaveBeenCalledWith(expectedInputText);
            });
        });

        describe('registerOnChange', () => {
            it('should properly set change propagation function', () => {
                const expectedFunction = (_: any) => undefined;
                component.propagateChange = () => {};

                component.registerOnChange(expectedFunction);

                expect(component.propagateChange).toEqual(expectedFunction);
            });
        });

        describe('clear input', () => {
            it('should clear the input', () => {
                const TEST_VALUE = 'boktong';
                component.inputText = TEST_VALUE;
                expect(component.inputText).toBe(TEST_VALUE);
                component.onClear();
                expect(component.inputText).toBe('');
            });
        });

        describe('registerOnTouched', () => {
            it('should be successfully called', () => {
                expect(() => component.registerOnTouched({})).not.toThrow();
            });
        });

        describe('writeValue', () => {
            it('should write empty string when value is undefined', () => {
                const expectedInputText = '8z1eKpFYu4';
                component.inputText = expectedInputText;

                component.writeValue(undefined);

                expect(component.inputText).toEqual('');
            });

            it('should write empty string when value is null', () => {
                const expectedInputText = '8z1eKpFYu4';
                component.inputText = expectedInputText;

                component.writeValue(null);

                expect(component.inputText).toEqual('');
            });

            it('should set input text when value is not undefined', () => {
                const expectedInputText = 'h9C2ONja0f';
                component.inputText = '6arCrnJiIQn';

                component.writeValue(expectedInputText);

                expect(component.inputText).toEqual(expectedInputText);
            });
        });
    });
});

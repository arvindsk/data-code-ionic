import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignore custom elements outside the scope of this test
            // providers: [ ElementRef
            // ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ButtonComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should add event listener to button', async(() => {
        component.elementRef = { nativeElement: { addEventListener: jasmine.createSpy() } };
        component.ngOnInit();
        expect(component.elementRef.nativeElement.addEventListener).toHaveBeenCalled();
    }));

    it('should NOT call stopPropagation when control is disabled', async(() => {
        let mockFunction;
        component.elementRef = {
            nativeElement: {
                addEventListener: function(arg1, arg2) {
                    mockFunction = arg2;
                },
            },
        };
        component.disabled = false;

        component.ngOnInit();

        const event = { stopPropagation: jasmine.createSpy() };
        mockFunction(event);
        expect(event.stopPropagation).not.toHaveBeenCalled();
    }));

    it('should call stopPropagation when control is disabled', async(() => {
        let mockFunction;
        component.elementRef = {
            nativeElement: {
                addEventListener: function(arg1, arg2) {
                    mockFunction = arg2;
                },
            },
        };
        component.disabled = true;

        component.ngOnInit();

        const event = { stopPropagation: jasmine.createSpy() };
        mockFunction(event);
        expect(event.stopPropagation).toHaveBeenCalled();
    }));
});

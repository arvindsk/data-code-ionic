import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlyoutComponent } from './flyout.component';
import { SidebarModule } from 'primeng/sidebar';
import { ResponsiveService, ScreenSizes } from 'expo-shared';
import { of } from 'rxjs';

describe('FlyoutComponent', () => {
    let responsiveServiceMock;
    let component: FlyoutComponent;
    let fixture: ComponentFixture<FlyoutComponent>;

    beforeEach(async(() => {
        responsiveServiceMock = {
            getScreenType: jasmine.createSpy().and.returnValue(of('desktop')),
        };
        TestBed.configureTestingModule({
            imports: [SidebarModule, BrowserAnimationsModule],
            declarations: [FlyoutComponent],
            providers: [
                {
                    provide: ResponsiveService,
                    useValue: responsiveServiceMock,
                },
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(FlyoutComponent);
                component = fixture.componentInstance;
            });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should determine tablet breakpoint to be false', () => {
            component.ngOnInit();
            expect(component.isTablet).toBeFalsy();
        });

        it('should determine tablet breakpoint to be true', inject([ResponsiveService], (responsiveService) => {
            responsiveService.getScreenType.and.returnValue(of(ScreenSizes.TABLET_LG));
            component.ngOnInit();
            expect(component.isTablet).toBeTruthy();
        }));
    });

    describe('ngOnDestroy', () => {
        it('should cleanup', () => {
            spyOn(component.onDestroy$, 'next');
            spyOn(component.onDestroy$, 'complete');
            component.ngOnDestroy();
            expect(component.onDestroy$.next).toHaveBeenCalled();
            expect(component.onDestroy$.complete).toHaveBeenCalled();
        });
    });
});

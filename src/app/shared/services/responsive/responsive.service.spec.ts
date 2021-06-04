import { async, TestBed } from '@angular/core/testing';
import { ResponsiveService } from './responsive.service';
import { Meta } from '@angular/platform-browser';

describe('Responsive service', () => {
    let component: ResponsiveService, metaServiceMock;

    beforeEach(async(() => {
        metaServiceMock = {
            updateTag: jasmine.createSpy(),
        };

        TestBed.configureTestingModule({
            providers: [ResponsiveService, { provide: Meta, useValue: metaServiceMock }],
        })
            .compileComponents()
            .then(() => {
                component = TestBed.get(ResponsiveService);
            });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly determine a small window width', () => {
        spyOn(component, 'getWindowInnerWidth').and.returnValue(500);
        component.checkWidth();
        return component.getScreenType().subscribe((response) => {
            expect(response).toEqual('mobile');
        });
    });

    it('should correctly determine a medium window width', () => {
        spyOn(component, 'getWindowInnerWidth').and.returnValue(900);
        component.checkWidth();
        return component.getScreenType().subscribe((response) => {
            expect(response).toEqual('tablet');
        });
    });

    it('should correctly determine a medium-large window width', () => {
        spyOn(component, 'getWindowInnerWidth').and.returnValue(1100);
        component.checkWidth();
        return component.getScreenType().subscribe((response) => {
            expect(response).toEqual('tablet-lg');
        });
    });

    it('should correctly determine a large window width', () => {
        spyOn(component, 'getWindowInnerWidth').and.returnValue(1400);
        component.checkWidth();
        return component.getScreenType().subscribe((response) => {
            expect(response).toEqual('desktop');
        });
    });

    describe('checkWidth', () => {
        it('should not set mobile screen if preventMobile is true', (done) => {
            spyOn(component, 'isUsingMSEventApi').and.returnValue(false);
            spyOn(component, 'getWindowInnerWidth').and.returnValue(300);
            component.suppressMobileViewport();
            component.checkWidth();
            component.getScreenType().subscribe((screenType) => {
                expect(screenType).toEqual('tablet');
                done();
            });
        });
    });

    describe('getWindowOuterWidth', () => {
        it('should return window outer width', () => {
            expect(component.getWindowOuterWidth()).not.toBeNull();
        });
    });

    describe('suppressMobileViewport', () => {
        it('should update the meta tag with a near tablet width', () => {
            spyOn(component, 'isUsingMSEventApi').and.returnValue(false);
            const dispatchEventSpy = spyOn(window, 'dispatchEvent');
            component.suppressMobileViewport();
            expect(dispatchEvent).toHaveBeenCalled();
            expect(metaServiceMock.updateTag).toHaveBeenCalledWith({ name: 'viewport', content: 'width=765, initial-scale=1' });
        });

        it('should do nothing if Event is not a function', () => {
            spyOn(component, 'isUsingMSEventApi').and.returnValue(true);
            component.suppressMobileViewport();
            expect(metaServiceMock.updateTag).not.toHaveBeenCalled();
        });
    });

    describe('restoreViewport', () => {
        it('should call checkWidth with the deviceWidth and update the meta tag', () => {
            spyOn(component, 'isUsingMSEventApi').and.returnValue(false);
            const dispatchEventSpy = spyOn(window, 'dispatchEvent');
            component.restoreViewport();
            expect(dispatchEvent).toHaveBeenCalled();
            expect(metaServiceMock.updateTag).toHaveBeenCalledWith({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
        });

        it('should do nothing if Event is not a function', () => {
            spyOn(component, 'isUsingMSEventApi').and.returnValue(true);
            component.restoreViewport();
            expect(metaServiceMock.updateTag).not.toHaveBeenCalled();
        });
    });
});

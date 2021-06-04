import { async } from '@angular/core/testing';
import { BrowserService } from './browser.service';

describe('BrowserService', () => {
    let browserService: BrowserService;

    beforeEach(async(() => {
        browserService = new BrowserService();
    }));

    describe('isRtl', () => {
        let getItemSpy;

        beforeEach(async(() => {
            getItemSpy = spyOn(localStorage, 'getItem');
        }));

        it('should return false if RTL is not set', () => {
            getItemSpy.and.returnValue(undefined);

            expect(browserService.isRtl()).toBeFalsy();
        });

        it('should return false if RTL is not set to the proper value', () => {
            getItemSpy.and.returnValue('asdf');

            expect(browserService.isRtl()).toBeFalsy();
        });

        it('should return true if RTL is set', () => {
            getItemSpy.and.returnValue('true');

            expect(browserService.isRtl()).toBeTruthy();
        });
    });

    describe('isChrome', () => {
        let windowMock;

        beforeEach(async(() => {
            windowMock = {
                navigator: {
                    vendor: undefined,
                    userAgent: undefined,
                },
                chrome: undefined,
                opr: undefined,
            };
            const getWindowSpy = spyOn(browserService, 'getWindow');
            getWindowSpy.and.returnValue(windowMock);
        }));

        it('should return true if IOSChrome', () => {
            windowMock.navigator.userAgent = 'CriOS';

            expect(browserService.isChrome()).toBeTruthy();
        });

        it('should return true if Chrome', () => {
            windowMock.navigator.userAgent = '';
            windowMock.chrome = 'chrome';
            windowMock.navigator.vendor = 'Google Inc.';
            windowMock.opr = undefined;

            expect(browserService.isChrome()).toBeTruthy();
        });

        it('should return false if IE Edge', () => {
            windowMock.navigator.userAgent = 'Edge';
            windowMock.opr = undefined;

            expect(browserService.isChrome()).toBeFalsy();
        });

        it('should return false if Firefox', () => {
            windowMock.navigator.userAgent = 'firefox';
            windowMock.opr = undefined;

            expect(browserService.isChrome()).toBeFalsy();
        });

        it('should return false if Opera', () => {
            windowMock.opr = 'Opera';

            expect(browserService.isChrome()).toBeFalsy();
        });
    });

    describe('getWindow', () => {
        it('should return window', () => {
            expect(browserService.getWindow()).toBe(window);
        });
    });
});

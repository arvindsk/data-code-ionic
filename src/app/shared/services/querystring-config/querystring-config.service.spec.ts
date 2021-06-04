import { async } from '@angular/core/testing';
import { QuerystringConfigService } from './querystring-config.service';

describe('QuerystringConfigService', () => {
    let component: QuerystringConfigService;

    beforeEach(async(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'removeItem');
        spyOn(localStorage, 'getItem');
        spyOn(console, 'log');
        component = new QuerystringConfigService({
            qsConfigMonitoredValues: { locale: { allowOverride: true } },
            featureFlagsAllowOverride: true,
            featureFlags: [{ host: '' }],
        });

        (localStorage.setItem as jasmine.Spy).calls.reset();
        (localStorage.removeItem as jasmine.Spy).calls.reset();
        (localStorage.getItem as jasmine.Spy).calls.reset();
        (console.log as jasmine.Spy).calls.reset();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a console error', () => {
        spyOn(console, 'error');
        const c = new QuerystringConfigService({});
        expect(console.error).toHaveBeenCalled();
    });

    describe('parseQueryString', () => {
        it('parses the query string and stores values into localStorage', () => {
            spyOn(component, 'getLocationSearch').and.returnValue('?services=mock&locale=ar&id_token_mock=clear&unknown&saveAsReport=true&unknownConfig=false');
            component.parseQueryString();
            expect(localStorage.setItem).toHaveBeenCalled();
            expect(localStorage.removeItem).toHaveBeenCalled();
        });
    });

    describe('setOrClear', () => {
        it('clears when no input provided', () => {
            component.setOrClear('test');
            expect(localStorage.removeItem).toHaveBeenCalled();
        });
    });

    describe('getItem', () => {
        it('gets item without storageKey', () => {
            (localStorage.getItem as jasmine.Spy).and.returnValue('test');
            const result = component.getItem('disable_animations');
            expect(result).toBe('test');
            expect(console.log).toHaveBeenCalled();
        });

        it('gets item with storageKey', () => {
            (localStorage.getItem as jasmine.Spy).and.returnValue('test');
            component.monitoredValues['locale'].allowOverride = true;
            const result = component.getItem('locale');
            expect(result).toBe('test');
            expect(console.log).toHaveBeenCalled();
        });
    });

    describe('isEnabled', () => {
        it('returns true if getItem is true', () => {
            spyOn(component, 'getItem').and.returnValue('true');
            const result = component.isEnabled('');
            expect(result).toBeTruthy();
        });

        it('returns false if getItem is unknown', () => {
            spyOn(component, 'getItem').and.returnValue('unknown value');
            const result = component.isEnabled('');
            expect(result).toBeFalsy();
        });

        it('returns null if getItem is unknown', () => {
            spyOn(component, 'getItem').and.returnValue(null);
            const result = component.isEnabled('');
            expect(result).toBeNull();
        });
    });

    describe('isMockEndpointEnabled', () => {
        it('returns true if isMockEndpointEnabled is true', () => {
            spyOn(component, 'getItem').and.returnValue('MOCK');
            const result = component.isMockEndpointEnabled();
            expect(result).toBeTruthy();
        });

        it('returns false if isMockEndpointEnabled is unknown', () => {
            spyOn(component, 'getItem').and.returnValue(null);
            const result = component.isMockEndpointEnabled();
            expect(result).toBeFalsy();
        });

        it('returns false if isMockEndpointEnabled is not mock', () => {
            spyOn(component, 'getItem').and.returnValue('other');
            const result = component.isMockEndpointEnabled();
            expect(result).toBeFalsy();
        });
    });
});

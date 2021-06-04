import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LocalizationService } from './localization.service';
import { QuerystringConfigService } from '../querystring-config/querystring-config.service';

describe('LocalizationService', () => {
    let component: LocalizationService;

    const qsConfigServiceMock = {
        getItem: jasmine.createSpy(),
    };

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: 'deployTimestamp', useValue: 'test' },
                { provide: QuerystringConfigService, useValue: qsConfigServiceMock },
                { provide: LocalizationService, useClass: LocalizationService, deps: [QuerystringConfigService, 'deployTimestamp'] },
            ],
        });

        component = TestBed.get(LocalizationService);
    }));

    afterEach(fakeAsync(() => {
        window.localStorage.removeItem('lang');
        window.localStorage.removeItem('override_lang');
    }));

    it('should set a console error', () => {
        spyOn(console, 'error');
        const c = new LocalizationService(qsConfigServiceMock as any, null as any);
        expect(console.error).toHaveBeenCalled();
    });

    describe('changeLanguage method', () => {
        it('should set a preferred/stored language in local storage', () => {
            // karma runs in an infinite loop if allowed to reload the page with window.location.reload
            // jasmine can't spy on the window.location.reload fn because it's not writable
            const reloadSpy = spyOn(component, 'reload');

            const EXPECTED_LANG = 'ar';
            component.changeLanguage(EXPECTED_LANG);

            expect(window.localStorage.getItem('lang')).toBe(EXPECTED_LANG);
            expect(reloadSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getLanguage method', () => {
        it('should return "en-US" by default', fakeAsync(() => {
            spyOn(component, 'getBrowserLanguage').and.returnValue('test-result');

            const result = component.getLanguage();

            expect(result).toEqual('test-result');
            expect(window.localStorage.getItem('lang')).toBeNull();
            expect(window.localStorage.getItem('override_lang')).toBeNull();
        }));

        it('should return url specified locale', fakeAsync(() => {
            spyOn(component, 'getBrowserLanguage').and.returnValue('test-result');
            qsConfigServiceMock.getItem.and.returnValue(null);
            const result = component.getLanguage();

            expect(result).toEqual('test-result');
        }));

        it('should return the preferred/stored language when override is cleared', () => {
            const EXPECTED_LANG = 'ar';
            qsConfigServiceMock.getItem.and.returnValue(EXPECTED_LANG);

            spyOn(component, 'getBrowserLanguage').and.returnValue('test-result');

            const result = component.getLanguage();

            expect(result).toEqual(EXPECTED_LANG);
            expect(window.localStorage.getItem('override_lang')).toBeNull();
        });
    });

    describe('getTranslationProviders method', () => {
        it('returns empty array when locale is not specified', async () => {
            spyOn(component, 'getLanguage');

            component.getTranslationProviders('');

            return component.getTranslationProviders('').then((response) => {
                expect(response).toEqual([]);
            });
        });

        it('returns empty array when locale starts with "en"', async () => {
            spyOn(component, 'getLanguage').and.returnValue('en-US');

            component.getTranslationProviders('');

            return component.getTranslationProviders('').then((response) => {
                expect(response).toEqual([]);
            });
        });

        it('returns the getLanguage() translation provider', async () => {
            spyOn(component, 'getLanguage').and.returnValue('ar');
            spyOn(console, 'log');
            window.localStorage.setItem('lang', 'value');

            return component.getTranslationProviders('test').then((response) => {
                expect(response[2]['useValue']).toEqual('ar');

                const storedValue = window.localStorage.getItem('lang');
                expect(storedValue).toBeNull();
                expect(console.log).toHaveBeenCalled();
            });
        });

        it('returns the getLanguage() translation provider (for zh-TW)', async () => {
            spyOn(component, 'getLanguage').and.returnValue('zh-TW');
            spyOn(console, 'log');
            window.localStorage.setItem('lang', 'value');

            return component.getTranslationProviders('test').then((response) => {
                expect(response[2]['useValue']).toEqual('zh-TW');

                const storedValue = window.localStorage.getItem('lang');
                expect(storedValue).toBeNull();
                expect(console.log).toHaveBeenCalled();
            });
        });

        it('returns file contents when file is found', async () => {
            spyOn(component, 'getLanguage').and.returnValue('ar');
            spyOn(console, 'log');

            // A file expected to be on the server to not return a 404 response
            // env.localeConfig.translationFileFormat = 'karma.js';

            window.localStorage.setItem('lang', 'value');

            return component.getTranslationProviders('').then((response) => {
                // The karma.js file will be returned;  We just want to verify that the response
                // is not empty
                expect(response[0]['useValue'].length).toBeGreaterThan(0);
            });
        });
    });

    describe('getTranslations method', () => {
        it('returns a result for en-US', () => {
            spyOn(component, 'httpGetSync').and.returnValue({ status: 200, responseText: 'not null' } as any);
            const result = component.getTranslations('en-US', '/assets/localization/messages.{0}.xlf');
            expect(result).not.toBeUndefined();
            expect(result).not.toBe('');
        });
    });

    describe('getEnvironmentLocale method', () => {
        it('finds correctly with input language', fakeAsync(() => {
            spyOn(component, 'getLanguage').and.returnValue('en');
            const result = component.getEnvironmentLocale([{ code: 'en' }]);

            expect(result.code).toEqual('en');
        }));

        it('returns en when no locale found', fakeAsync(() => {
            spyOn(component, 'getLanguage').and.returnValue('unknown lang');
            const result = component.getEnvironmentLocale([{ code: 'en' }]);

            expect(result.code).toEqual('en');
        }));
    });

    describe('format', () => {
        it('replaces positions 0 and 1', () => {
            const modifiedString = '{0}-{1}';

            const newString = component.format(modifiedString, 'test1', 'test2');

            expect(newString).toEqual('test1-test2');
        });

        it('replaces multiple 0 positions', () => {
            const modifiedString = '{0}-{0}';

            const newString = component.format(modifiedString, 'test1');

            expect(newString).toEqual('test1-test1');
        });

        it('does nothing if nothing to replace', () => {
            const modifiedString = '{0}';

            const newString = component.format(modifiedString);

            expect(newString).toEqual('{0}');
        });
    });
});

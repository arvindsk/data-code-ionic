import { Injectable, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy, Inject } from '@angular/core';

// I18n support for Dates/Currency/Percentage/Decimal
import locale_ar from '@angular/common/locales/ar';
import locale_zhTW from '@angular/common/locales/zh-Hant';
import { registerLocaleData } from '@angular/common';
import { setCookie } from '../../utilities/cookie.utilities';
import { QuerystringConfigService } from '../querystring-config/querystring-config.service';

export interface Locale {
    display: string;
    code: string;
}

// this keeps TypeScript happy so we can use our global constant that is created at runtime
declare const DEPLOY_TIMESTAMP = '';

@Injectable({
    providedIn: 'root', // Makes this service a singleton
})
export class LocalizationService {
    public readonly TRANSLATION_FORMAT = 'xlf';
    public readonly TRANSLATION_STRATEGY = MissingTranslationStrategy.Ignore;

    private readonly LOCALSTORAGE_KEY = 'lang';

    private readonly LANGUAGE_COOKIE_KEY = 'APPLICATION_LANGUAGE';

    constructor(private qsConfigService: QuerystringConfigService, @Inject('deployTimestamp') private deployTimestamp: string) {
        if (!deployTimestamp) {
            console.error("LocalizationService: provider for 'deployTimestamp' needs to be specified.");
            return;
        }
    }

    /**
     * Untestable. Jasmine can't spy on the window.location.reload()
     * function because it's not writable; allowing the test to reload the page causes
     * karma to run in an infinite loop.
     */
    /* istanbul ignore next */
    public reload() {
        window.location.reload(true);
    }

    /**
     * As of Angular 5.x, changing the language in an AOT compiled app using I18n for
     * translation REQUIRES the entire application to be reloaded because of the way
     * the files are served. The server needs to route traffic to the appropraite language
     * based on the APPLICATION_LANGUAGE cookie first, and default to the user's browser language
     * if a cookie is not found.
     * REF: https://stackoverflow.com/questions/47312962/angular-5-internationalization
     * @param locale - the code that identifies a particular language (eg. ar, en, zh-TW)
     */
    public changeLanguage(locale: string) {
        setCookie(this.LANGUAGE_COOKIE_KEY, locale);
        window.localStorage.setItem(this.LOCALSTORAGE_KEY, locale);
        this.reload();
    }

    /**
     * Returns A) the override language in the URL/local storage (eg. ?locale=ar); B) the user's previously
     * selected language, set in local storage; OR C) the browser language. In that order.
     *
     * NOTE: Can't use NGXLogger instead of console.log since this class is bootstrapped on startup.
     * NGXLogger isn't loaded in that scenario.
     */
    public getLanguage(): string {
        const urlOverrideLang = this.qsConfigService.getItem('locale');
        if (urlOverrideLang) {
            return urlOverrideLang;
        }

        // TODO: use local storage until user preferences provider is established
        // const localStorageLang = urlOverrideLang;
        // if (localStorageLang) {
        //     return localStorageLang;
        // }

        return this.getBrowserLanguage();
    }

    public getEnvironmentLocale(locales) {
        let currentLocaleSetting = locales.find((item) => item.code.toLowerCase() === this.getLanguage().toLowerCase());

        if (!currentLocaleSetting) {
            currentLocaleSetting = locales[0]; // en default
        }

        return currentLocaleSetting;
    }

    // The app requires translation providers when bootstrapped
    public async getTranslationProviders(translationFileFormat: string): Promise<Object[]> {
        // Get the locale id from the global
        const locale = this.getLanguage();

        // return no providers if fail to get translation file for locale
        const noProviders: Object[] = [];

        // No locale or U.S. English: use default text
        if (!locale || locale.startsWith('en-')) {
            return Promise.resolve(noProviders);
        }

        switch (locale) {
            case 'ar':
                registerLocaleData(locale_ar, locale);
                break;
            case 'zh-TW':
                registerLocaleData(locale_zhTW, locale);
                break;
        }

        const translations = this.getTranslations(locale, translationFileFormat);
        return [
            { provide: TRANSLATIONS, useValue: translations },
            { provide: TRANSLATIONS_FORMAT, useValue: this.TRANSLATION_FORMAT },
            { provide: LOCALE_ID, useValue: locale },
        ];
    }

    // Must do this the old way - httpClient is not available since this class is bootstrapped;
    // (window as any).fetch is not supported in IE10 and IE11
    public httpGetSync(theUrl) {
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open('GET', theUrl, false);
        xmlHttp.send(null);

        return xmlHttp;
    }

    public getTranslations(locale: string, translationFileFormat: string) {
        if (locale === 'en-US') {
            locale = 'en';
        }

        const translationFile = this.format(translationFileFormat, locale, this.deployTimestamp);

        // Angular providers can't load async.  Doesn't matter anyways because we need this file loaded
        // when the app loads.
        // https://stackoverflow.com/questions/46257184/angular-async-factory-provider
        const xmlHttp = this.httpGetSync(translationFile);

        if (xmlHttp.status === 404) {
            console.log(`Unknown locale file ${translationFile}.  Resetting back to default`);
            window.localStorage.removeItem('lang');
            return '';
        }

        return xmlHttp.responseText;
    }

    // Untestable code since navigator cannot be overridden
    /* istanbul ignore next */
    public getBrowserLanguage() {
        const anyNavigator = navigator as any;
        return (
            (anyNavigator.languages && anyNavigator.languages[0]) || // Chrome / Firefox
            anyNavigator.language || // All browsers
            anyNavigator.userLanguage
        ); // IE <= 10
    }

    public format(inputString, ...replacements: string[]) {
        // Ex: '{0}-{1}'.format('test1', 'test2'); shows:  'test1-test2'

        const args = replacements;
        return inputString.replace(/{(\d+)}/g, function(match, numberParam) {
            return typeof args[numberParam] !== 'undefined' ? args[numberParam] : match;
        });
    }
}

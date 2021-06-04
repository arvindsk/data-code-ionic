import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root', // Makes this service a singleton
})
export class QuerystringConfigService {
    private loggedQuerystringValues: string[] = [];
    public environment;
    public monitoredValues;

    constructor(@Inject('environment') environment) {
        if (!environment || !environment.qsConfigMonitoredValues || environment.featureFlagsAllowOverride === undefined || environment.featureFlags === undefined) {
            console.error('QuerystringConfigService: providers for \'environment\' needs to be specified with \'qsConfigMonitoredValues\' and \'featureFlagsAllowOverride\'');
            return;
        }
        this.environment = environment;
        this.monitoredValues = environment.qsConfigMonitoredValues;
        this.parseQueryString();
    }

    parseQueryString() {
        let featureFlags = {};
        this.environment.featureFlags.forEach((featureFlagSetting) => {
            const currentHost = featureFlagSetting.host.replace('{{host}}', this.getWindowLocationHostname());
            if (this.getWindowLocationHostname() === currentHost) {
                featureFlags = featureFlagSetting;
            }
        });

        // Get all the querystring values and populate into the monitoredValues object above
        const locationSearch = this.getLocationSearch();
        if (locationSearch) {
            const classThis = this;
            locationSearch
                .substr(1)
                .split('&')
                .forEach(function(item) {
                    const s = item.split(/=(.+)/), // Split on first occurrence of '=' char
                        k = s[0],
                        v = s[1] && decodeURIComponent(s[1]);

                    let configValue = classThis.monitoredValues[k];
                    let allowOverride = false;
                    let storageKey = k;

                    if (!v) {
                        return;
                    }

                    // Check for feature flag settings
                    if (!configValue) {
                        const flagPresent = featureFlags[k] !== undefined;

                        /* istanbul ignore next -- Phantom JS is being a pain on the server and showing this line as uncovered when it actually is */
                        if (flagPresent && k !== 'host') {
                            configValue = {
                                storageKey: k,
                                allowOverride: classThis.environment.featureFlagsAllowOverride,
                            };
                        }
                    }
                    /* istanbul ignore next -- US292839 - if you are editing this file, try to add unit tests so this tag can be removed  */
                    if (configValue) {
                        if (configValue.allowOverride) {
                            allowOverride = configValue.allowOverride;
                        }
                        if (configValue.storageKey) {
                            storageKey = configValue.storageKey;
                        }
                    }

                    classThis.setOrClear(storageKey, v, allowOverride);
                });
        }
    }

    public setOrClear(storageKey: string, value: any = null, allowOverride = true) {
        if (!allowOverride || value === null || (value.trim && value.trim() === '') || value === 'clear') {
            localStorage.removeItem(storageKey);
        } else {
            localStorage.setItem(storageKey, value);
        }
    }

    /* istanbul ignore next */
    public getLocationSearch(): string {
        return location.search;
    }

    public getWindowLocationHostname(): string {
        return window.location.hostname;
    }

    public getItem(key: string): string | null {
        let lookupKey = key;
        /* istanbul ignore next -- US292839 - if you are editing this file, try to add unit tests so this tag can be removed  */
        if (this.monitoredValues[key]) {
            if (!this.monitoredValues[key].allowOverride) {
                return null;
            }
            if (this.monitoredValues[key].storageKey) {
                lookupKey = this.monitoredValues[key].storageKey;
            }
        }
        const item = localStorage.getItem(lookupKey);
        /* istanbul ignore next -- US292839 - if you are editing this file, try to add unit tests so this tag can be removed  */
        if (!!item && this.loggedQuerystringValues.indexOf(key) < 0) {
            console.log(`QUERYSTRING CONFIG '${key}' being used with value: ${item}. To clear:  ?${key}=clear`);
            this.loggedQuerystringValues.push(key);
        }
        return item;
    }

    // Helper functions
    public isEnabled(key: string): boolean | null {
        const item = this.getItem(key);

        if (!item) {
            return null;
        }
        return item === 'true';
    }

    public isMockEndpointEnabled(): boolean {
        const mockValue = this.getItem('services');

        if (!mockValue) {
            return false;
        }

        return mockValue.toLowerCase() === 'mock';
    }
}

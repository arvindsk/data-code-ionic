import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BrowserService {
    constructor() {}

    public isRtl(): boolean {
        return localStorage.getItem('isRtl') === 'true';
    }

    public isChrome(): boolean {
        // PLEASE SEE: https://stackoverflow.com/a/13348618
        //
        // please note,
        // that IE11 now returns undefined again for window.chrome
        // and new Opera 30 outputs true for window.chrome
        // but needs to check if window.opr is not undefined
        // and new IE Edge outputs to true now for window.chrome
        // and if not iOS Chrome check
        // so use the below updated condition
        const window: Window = this.getWindow();
        const isChromium = window['chrome'];
        const winNav = window.navigator;
        const vendorName = winNav.vendor;
        const isOpera = typeof window['opr'] !== 'undefined';
        const isFirefox = winNav.userAgent ? winNav.userAgent.toLowerCase().indexOf('edge') > -1 : false;
        const isIEedge = winNav.userAgent ? winNav.userAgent.toLowerCase().indexOf('firefox') > -1 : false;
        const isIOSChrome = winNav.userAgent ? winNav.userAgent.match('CriOS') !== null : false;
        const isChrome = isChromium !== null && typeof isChromium !== 'undefined' && vendorName === 'Google Inc.' && isOpera === false && isIEedge === false && isFirefox === false;

        return isIOSChrome || isChrome;
    }

    // separated out for unit tests
    public getWindow(): Window {
        return window;
    }
}

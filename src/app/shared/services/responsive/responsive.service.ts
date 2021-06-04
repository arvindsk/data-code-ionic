import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Meta } from '@angular/platform-browser';

export enum ScreenSizes {
    MOBILE = 'mobile',
    TABLET = 'tablet',
    TABLET_LG = 'tablet-lg',
    DESKTOP = 'desktop',
}

@Injectable({
    providedIn: 'root',
})
export class ResponsiveService {
    public screenType = new BehaviorSubject<any>(false);

    private preventMobile = false;

    constructor(private meta: Meta) {
        this.checkWidth();
    }

    onScreenChange(status: string) {
        this.screenType.next(status);
    }

    getScreenType(): Observable<any> {
        return this.screenType.asObservable();
    }

    getWindowInnerWidth(): number {
        return window.innerWidth;
    }

    getWindowOuterWidth(): number {
        return window.outerWidth;
    }

    public restoreViewport() {
        if (this.isUsingMSEventApi()) {
            /* The browser is IE, and mobile shouldn't be a problem */
            return;
        }

        this.preventMobile = false;
        window.dispatchEvent(new Event('resize'));
        this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    }

    public suppressMobileViewport() {
        if (this.isUsingMSEventApi()) {
            /* The browser is IE, and mobile shouldn't be a problem */
            return;
        }

        this.preventMobile = true;
        /*
            IMPORTANT - Cap the width at 765, which is BELOW the width for tablet.
            This will give real estate but will let the app move back to mobile seamlessly.
            This is the only way I could get around the problem where the app would not
            switch back to mobile with the device-width is restored. (Tom Conley 12/2019)
        */
        this.meta.updateTag({ name: 'viewport', content: 'width=765, initial-scale=1' });
        window.dispatchEvent(new Event('resize'));
    }

    // Called from app.component.ts @HostListener('window:resize')
    public checkWidth() {
        const width = this.getWindowInnerWidth();

        if (width < 768 && !this.preventMobile) {
            this.onScreenChange('mobile');
        } else if (width < 1024) {
            this.onScreenChange('tablet');
        } else if (width < 1280) {
            this.onScreenChange('tablet-lg');
        } else {
            this.onScreenChange('desktop');
        }

        return width;
    }

    /* istanbul ignore next -- isolated for unit testing purposes */
    public isUsingMSEventApi() {
        return typeof Event !== 'function';
    }
}

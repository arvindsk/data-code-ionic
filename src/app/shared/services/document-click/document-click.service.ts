import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Binding to document click is heavy and can cause the page to become unresponsive if there are a lot of components looking to bind.
// This service binds once and then provides a listener
@Injectable({
    providedIn: 'root', // Makes this service a singleton
})
export class DocumentClickService {
    public documentClick$ = new Subject<EventTarget | null>();

    constructor() {
        document.addEventListener('click', (target) => {
            this.documentClick$.next(target.target);
        });
    }
}

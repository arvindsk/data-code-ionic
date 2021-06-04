import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export enum ScriptNames {
    GOOGLE_MAP,
}

@Injectable({
    providedIn: 'root',
})
export class ScriptLoadedService {
    scriptLoaded = new ReplaySubject(1);

    public broadcastScriptLoaded(scriptName: ScriptNames) {
        this.scriptLoaded.next(scriptName);
    }
}

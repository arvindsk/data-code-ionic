import { TestBed, async } from '@angular/core/testing';
import { ScriptLoadedService, ScriptNames } from './script-loaded.service';

describe('ScriptLoadedService', () => {
    let service: ScriptLoadedService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ScriptLoadedService],
        });
        service = TestBed.get(ScriptLoadedService);
    }));

    describe('broadcastScriptLoaded', () => {
        it('calls scriptLoaded', () => {
            spyOn(service.scriptLoaded, 'next');
            service.broadcastScriptLoaded(ScriptNames.GOOGLE_MAP);

            expect(service.scriptLoaded.next).toHaveBeenCalled();
        });
    });
});

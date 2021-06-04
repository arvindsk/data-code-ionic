import { async } from '@angular/core/testing';
import { DocumentClickService } from './document-click.service';

describe('DocumentClickService', () => {
    let component: DocumentClickService;

    beforeEach(async(() => {
        spyOn(document, 'addEventListener');
        component = new DocumentClickService();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('documentClick$', () => {
        it('listens for events from document.addEventListener', (done) => {
            expect(document.addEventListener).toHaveBeenCalled();

            component.documentClick$.subscribe((target) => {
                expect(target).toEqual('test' as any);
                done();
            });

            (document.addEventListener as jasmine.Spy).calls.argsFor(0)[1]({ target: 'test' });
        });
    });
});

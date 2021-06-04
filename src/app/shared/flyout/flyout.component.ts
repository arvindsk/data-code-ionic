import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ResponsiveService, ScreenSizes } from '../services/responsive/responsive.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-flyout',
    templateUrl: './flyout.component.html',
    styleUrls: ['./flyout.component.scss'],
})
export class FlyoutComponent implements OnInit, OnDestroy {
    @Input() public show = false;
    @Input() public position = 'right';
    @Input() public contents: any;
    @Output() hideFlyout: EventEmitter<boolean> = new EventEmitter();
    public onDestroy$: Subject<void> = new Subject<void>();
    public isTablet = false;

    constructor(private responsiveService: ResponsiveService) {}

    ngOnInit(): void {
        this.responsiveService
            .getScreenType()
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((screen) => {
                this.isTablet = screen === ScreenSizes.TABLET || screen === ScreenSizes.TABLET_LG;
            });
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}

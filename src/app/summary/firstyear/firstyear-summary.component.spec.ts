import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstyearSummaryComponent } from './firstyear-summary.component';

describe('FirstyearSummaryComponent', () => {
  let component: FirstyearSummaryComponent;
  let fixture: ComponentFixture<FirstyearSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstyearSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstyearSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

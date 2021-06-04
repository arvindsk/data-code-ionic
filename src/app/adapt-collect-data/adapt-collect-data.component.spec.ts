import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptSummaryComponent } from './adapt-summary.component';

describe('AdaptSummaryComponent', () => {
  let component: AdaptSummaryComponent;
  let fixture: ComponentFixture<AdaptSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

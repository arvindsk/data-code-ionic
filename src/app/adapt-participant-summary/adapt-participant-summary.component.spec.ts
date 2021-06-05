import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptParticipantSummaryComponent } from './adapt-participant-summary.component';

describe('AdaptParticipantSummaryComponent', () => {
  let component: AdaptParticipantSummaryComponent;
  let fixture: ComponentFixture<AdaptParticipantSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptParticipantSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptParticipantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

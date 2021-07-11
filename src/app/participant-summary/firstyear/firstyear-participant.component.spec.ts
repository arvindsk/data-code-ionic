import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstyearParticipantComponent } from './firstyear-participant.component';

describe('FirstyearParticipantComponent', () => {
  let component: FirstyearParticipantComponent;
  let fixture: ComponentFixture<FirstyearParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstyearParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstyearParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineParticipantComponent } from './baseline-participant.component';

describe('BaselineParticipantComponent', () => {
  let component: BaselineParticipantComponent;
  let fixture: ComponentFixture<BaselineParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

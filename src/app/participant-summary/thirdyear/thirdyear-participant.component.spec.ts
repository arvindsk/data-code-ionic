import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdyearParticipantComponent } from './thirdyear-participant.component';

describe('ThirdyearParticipantComponent', () => {
  let component: ThirdyearParticipantComponent;
  let fixture: ComponentFixture<ThirdyearParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdyearParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdyearParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdyearSummaryComponent } from './thirdyear-summary.component';

describe('ThirdyearSummaryComponent', () => {
  let component: ThirdyearSummaryComponent;
  let fixture: ComponentFixture<ThirdyearSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdyearSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdyearSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

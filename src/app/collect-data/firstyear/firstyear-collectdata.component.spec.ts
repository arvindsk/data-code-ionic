import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstyearCollectDataComponent } from './firstyear-collectdata.component';

describe('FirstyearCollectDataComponent', () => {
  let component: FirstyearCollectDataComponent;
  let fixture: ComponentFixture<FirstyearCollectDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstyearCollectDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstyearCollectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

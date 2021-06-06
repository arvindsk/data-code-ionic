import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineSummaryComponent } from './baseline-summary.component';

describe('BaselineSummaryComponent', () => {
  let component: BaselineSummaryComponent;
  let fixture: ComponentFixture<BaselineSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

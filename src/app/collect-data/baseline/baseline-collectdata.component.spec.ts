import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineCollectDataComponent } from './baseline-collectdata.component';

describe('BaselineCollectDataComponent', () => {
  let component: BaselineCollectDataComponent;
  let fixture: ComponentFixture<BaselineCollectDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselineCollectDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineCollectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

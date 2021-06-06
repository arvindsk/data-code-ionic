import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDataComponent } from './collect-data.component';

describe('CollectDataComponent', () => {
  let component: CollectDataComponent;
  let fixture: ComponentFixture<CollectDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

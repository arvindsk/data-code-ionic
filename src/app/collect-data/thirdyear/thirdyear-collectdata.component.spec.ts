import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdyearCollectDataComponent } from './thirdyear-collectdata.component';

describe('ThirdyearCollectDataComponent', () => {
  let component: ThirdyearCollectDataComponent;
  let fixture: ComponentFixture<ThirdyearCollectDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdyearCollectDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdyearCollectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

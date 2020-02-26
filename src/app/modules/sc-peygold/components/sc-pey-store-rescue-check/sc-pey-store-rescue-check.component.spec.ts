import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyStoreRescueCheckComponent } from './sc-pey-store-rescue-check.component';

describe('ScPeyStoreRescueCheckComponent', () => {
  let component: ScPeyStoreRescueCheckComponent;
  let fixture: ComponentFixture<ScPeyStoreRescueCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyStoreRescueCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyStoreRescueCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

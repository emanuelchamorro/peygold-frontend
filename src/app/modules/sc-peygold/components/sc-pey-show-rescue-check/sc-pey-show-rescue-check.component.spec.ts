import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyShowRescueCheckComponent } from './sc-pey-show-rescue-check.component';

describe('ScPeyShowRescueCheckComponent', () => {
  let component: ScPeyShowRescueCheckComponent;
  let fixture: ComponentFixture<ScPeyShowRescueCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyShowRescueCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyShowRescueCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

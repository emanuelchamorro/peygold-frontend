import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyRescueChecksComponent } from './sc-pey-rescue-checks.component';

describe('ScPeyRescueChecksComponent', () => {
  let component: ScPeyRescueChecksComponent;
  let fixture: ComponentFixture<ScPeyRescueChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyRescueChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyRescueChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

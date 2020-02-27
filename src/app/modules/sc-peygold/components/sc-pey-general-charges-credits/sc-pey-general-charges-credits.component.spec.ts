import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyGeneralChargesCreditsComponent } from './sc-pey-general-charges-credits.component';

describe('ScPeyGeneralChargesCreditsComponent', () => {
  let component: ScPeyGeneralChargesCreditsComponent;
  let fixture: ComponentFixture<ScPeyGeneralChargesCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyGeneralChargesCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyGeneralChargesCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

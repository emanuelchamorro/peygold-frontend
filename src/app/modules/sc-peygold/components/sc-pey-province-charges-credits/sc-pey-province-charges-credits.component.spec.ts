import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyProvinceChargesCreditsComponent } from './sc-pey-province-charges-credits.component';

describe('ScPeyProvinceChargesCreditsComponent', () => {
  let component: ScPeyProvinceChargesCreditsComponent;
  let fixture: ComponentFixture<ScPeyProvinceChargesCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyProvinceChargesCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyProvinceChargesCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

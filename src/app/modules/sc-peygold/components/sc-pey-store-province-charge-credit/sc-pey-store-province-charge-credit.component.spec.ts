import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyStoreProvinceChargeCreditComponent } from './sc-pey-store-province-charge-credit.component';

describe('ScPeyStoreProvinceChargeCreditComponent', () => {
  let component: ScPeyStoreProvinceChargeCreditComponent;
  let fixture: ComponentFixture<ScPeyStoreProvinceChargeCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyStoreProvinceChargeCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyStoreProvinceChargeCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

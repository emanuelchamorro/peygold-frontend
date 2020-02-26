import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyStoreGeneralChargeCreditComponent } from './sc-pey-store-general-charge-credit.component';

describe('ScPeyStoreGeneralChargeCreditComponent', () => {
  let component: ScPeyStoreGeneralChargeCreditComponent;
  let fixture: ComponentFixture<ScPeyStoreGeneralChargeCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyStoreGeneralChargeCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyStoreGeneralChargeCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyStoreInsurancecarrierComponent } from './sc-pey-store-insurancecarrier.component';

describe('ScPeyStoreInsurancecarrierComponent', () => {
  let component: ScPeyStoreInsurancecarrierComponent;
  let fixture: ComponentFixture<ScPeyStoreInsurancecarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyStoreInsurancecarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyStoreInsurancecarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

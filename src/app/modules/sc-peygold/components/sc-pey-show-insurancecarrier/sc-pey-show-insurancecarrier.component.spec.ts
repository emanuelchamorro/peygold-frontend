import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyShowInsurancecarrierComponent } from './sc-pey-show-insurancecarrier.component';

describe('ScPeyShowInsurancecarrierComponent', () => {
  let component: ScPeyShowInsurancecarrierComponent;
  let fixture: ComponentFixture<ScPeyShowInsurancecarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyShowInsurancecarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyShowInsurancecarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

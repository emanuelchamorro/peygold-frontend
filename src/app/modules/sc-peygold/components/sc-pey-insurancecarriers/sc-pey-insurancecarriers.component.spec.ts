import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyInsurancecarriersComponent } from './sc-pey-insurancecarriers.component';

describe('ScPeyInsurancecarriersComponent', () => {
  let component: ScPeyInsurancecarriersComponent;
  let fixture: ComponentFixture<ScPeyInsurancecarriersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyInsurancecarriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyInsurancecarriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

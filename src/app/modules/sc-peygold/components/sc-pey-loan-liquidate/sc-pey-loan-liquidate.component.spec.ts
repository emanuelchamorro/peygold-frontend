import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLoanLiquidateComponent } from './sc-pey-loan-liquidate.component';

describe('ScPeyLoanLiquidateComponent', () => {
  let component: ScPeyLoanLiquidateComponent;
  let fixture: ComponentFixture<ScPeyLoanLiquidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLoanLiquidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLoanLiquidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

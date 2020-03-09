import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLoanCompanyCreditRequestHistoryComponent } from './sc-pey-loan-company-credit-request-history.component';

describe('ScPeyLoanCompanyCreditRequestHistoryComponent', () => {
  let component: ScPeyLoanCompanyCreditRequestHistoryComponent;
  let fixture: ComponentFixture<ScPeyLoanCompanyCreditRequestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLoanCompanyCreditRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLoanCompanyCreditRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PePeyLoanInsuranceReviewComponent } from './pe-pey-loan-insurance-review.component';

describe('PePeyLoanInsuranceReviewComponent', () => {
  let component: PePeyLoanInsuranceReviewComponent;
  let fixture: ComponentFixture<PePeyLoanInsuranceReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PePeyLoanInsuranceReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PePeyLoanInsuranceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

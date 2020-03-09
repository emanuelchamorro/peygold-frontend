import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLoanAdministratorReviewComponent } from './sc-pey-loan-administrator-review.component';

describe('ScPeyLoanAdministratorReviewComponent', () => {
  let component: ScPeyLoanAdministratorReviewComponent;
  let fixture: ComponentFixture<ScPeyLoanAdministratorReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLoanAdministratorReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLoanAdministratorReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

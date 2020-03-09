import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLoanAdministratorCheckReviewComponent } from './sc-pey-loan-administrator-check-review.component';

describe('ScPeyLoanAdministratorCheckReviewComponent', () => {
  let component: ScPeyLoanAdministratorCheckReviewComponent;
  let fixture: ComponentFixture<ScPeyLoanAdministratorCheckReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLoanAdministratorCheckReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLoanAdministratorCheckReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

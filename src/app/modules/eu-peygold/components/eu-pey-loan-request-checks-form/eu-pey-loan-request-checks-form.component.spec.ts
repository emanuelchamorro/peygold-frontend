import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyLoanRequestChecksFormComponent } from './eu-pey-loan-request-checks-form.component';

describe('EuPeyLoanRequestChecksFormComponent', () => {
  let component: EuPeyLoanRequestChecksFormComponent;
  let fixture: ComponentFixture<EuPeyLoanRequestChecksFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyLoanRequestChecksFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyLoanRequestChecksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

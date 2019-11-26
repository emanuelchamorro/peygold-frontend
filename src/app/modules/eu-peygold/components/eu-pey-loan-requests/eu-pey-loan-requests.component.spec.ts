import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyLoanRequestsComponent } from './eu-pey-loan-requests.component';

describe('EuPeyLoanRequestsComponent', () => {
  let component: EuPeyLoanRequestsComponent;
  let fixture: ComponentFixture<EuPeyLoanRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyLoanRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyLoanRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

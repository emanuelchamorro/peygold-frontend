import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyLoanRequestComponent } from './eu-pey-loan-request.component';

describe('EuPeyLoanRequestComponent', () => {
  let component: EuPeyLoanRequestComponent;
  let fixture: ComponentFixture<EuPeyLoanRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyLoanRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

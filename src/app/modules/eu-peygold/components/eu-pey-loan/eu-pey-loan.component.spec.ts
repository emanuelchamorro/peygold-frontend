import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyLoanComponent } from './eu-pey-loan.component';

describe('EuPeyLoanComponent', () => {
  let component: EuPeyLoanComponent;
  let fixture: ComponentFixture<EuPeyLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

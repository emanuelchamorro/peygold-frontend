import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyLoanHelpComponent } from './eu-pey-loan-help.component';

describe('EuPeyLoanHelpComponent', () => {
  let component: EuPeyLoanHelpComponent;
  let fixture: ComponentFixture<EuPeyLoanHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyLoanHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyLoanHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

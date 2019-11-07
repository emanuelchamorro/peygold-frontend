import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyAddByBankDepositComponent } from './eu-pey-money-add-by-bank-deposit.component';

describe('EuPeyMoneyAddByBankDepositComponent', () => {
  let component: EuPeyMoneyAddByBankDepositComponent;
  let fixture: ComponentFixture<EuPeyMoneyAddByBankDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyAddByBankDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyAddByBankDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

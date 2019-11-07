import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyAddByBankTransferComponent } from './eu-pey-money-add-by-bank-transfer.component';

describe('EuPeyMoneyAddByBankTransferComponent', () => {
  let component: EuPeyMoneyAddByBankTransferComponent;
  let fixture: ComponentFixture<EuPeyMoneyAddByBankTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyAddByBankTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyAddByBankTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

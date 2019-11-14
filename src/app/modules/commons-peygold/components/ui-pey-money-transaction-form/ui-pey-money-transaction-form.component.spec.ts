import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyMoneyTransactionFormComponent } from './ui-pey-money-transaction-form.component';

describe('UIPeyMoneyTransactionFormComponent', () => {
  let component: UIPeyMoneyTransactionFormComponent;
  let fixture: ComponentFixture<UIPeyMoneyTransactionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyMoneyTransactionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyMoneyTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

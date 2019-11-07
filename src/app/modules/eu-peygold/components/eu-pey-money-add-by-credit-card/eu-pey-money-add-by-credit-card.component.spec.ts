import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyAddByCreditCardComponent } from './eu-pey-money-add-by-credit-card.component';

describe('EuPeyMoneyAddByCreditCardComponent', () => {
  let component: EuPeyMoneyAddByCreditCardComponent;
  let fixture: ComponentFixture<EuPeyMoneyAddByCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyAddByCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyAddByCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyAddAmountFormComponent } from './eu-pey-money-add-amount-form.component';

describe('EuPeyMoneyAddAmountFormComponent', () => {
  let component: EuPeyMoneyAddAmountFormComponent;
  let fixture: ComponentFixture<EuPeyMoneyAddAmountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyAddAmountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyAddAmountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

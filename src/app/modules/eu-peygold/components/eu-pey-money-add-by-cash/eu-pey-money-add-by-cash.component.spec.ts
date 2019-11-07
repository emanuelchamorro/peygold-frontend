import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyAddByCashComponent } from './eu-pey-money-add-by-cash.component';

describe('EuPeyMoneyAddByCashComponent', () => {
  let component: EuPeyMoneyAddByCashComponent;
  let fixture: ComponentFixture<EuPeyMoneyAddByCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyAddByCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyAddByCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

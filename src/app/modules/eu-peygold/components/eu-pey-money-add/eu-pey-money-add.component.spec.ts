import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyAddComponent } from './eu-pey-money-add.component';

describe('EuPeyMoneyAddComponent', () => {
  let component: EuPeyMoneyAddComponent;
  let fixture: ComponentFixture<EuPeyMoneyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

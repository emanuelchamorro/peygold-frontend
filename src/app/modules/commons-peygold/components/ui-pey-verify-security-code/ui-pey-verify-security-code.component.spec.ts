import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPeyVerifySecurityCodeComponent } from './ui-pey-verify-security-code.component';

describe('UiPeyVerifySecurityCodeComponent', () => {
  let component: UiPeyVerifySecurityCodeComponent;
  let fixture: ComponentFixture<UiPeyVerifySecurityCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPeyVerifySecurityCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPeyVerifySecurityCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

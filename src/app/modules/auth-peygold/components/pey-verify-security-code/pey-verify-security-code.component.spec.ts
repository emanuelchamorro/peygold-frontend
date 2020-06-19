import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeyVerifySecurityCodeComponent } from './pey-verify-security-code.component';

describe('PeyVerifySecurityCodeComponent', () => {
  let component: PeyVerifySecurityCodeComponent;
  let fixture: ComponentFixture<PeyVerifySecurityCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeyVerifySecurityCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeyVerifySecurityCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

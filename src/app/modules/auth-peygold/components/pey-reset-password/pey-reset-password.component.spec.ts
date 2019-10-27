import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeyResetPasswordComponent } from './pey-reset-password.component';

describe('PeyResetPasswordComponent', () => {
  let component: PeyResetPasswordComponent;
  let fixture: ComponentFixture<PeyResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeyResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeyResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeyVerifyEmailComponent } from './pey-verify-email.component';

describe('PeyVerifyEmailComponent', () => {
  let component: PeyVerifyEmailComponent;
  let fixture: ComponentFixture<PeyVerifyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeyVerifyEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeyVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

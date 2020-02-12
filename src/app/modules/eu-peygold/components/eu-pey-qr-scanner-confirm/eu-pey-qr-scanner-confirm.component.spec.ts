import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyQrScannerConfirmComponent } from './eu-pey-qr-scanner-confirm.component';

describe('EuPeyQrScannerConfirmComponent', () => {
  let component: EuPeyQrScannerConfirmComponent;
  let fixture: ComponentFixture<EuPeyQrScannerConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyQrScannerConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyQrScannerConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

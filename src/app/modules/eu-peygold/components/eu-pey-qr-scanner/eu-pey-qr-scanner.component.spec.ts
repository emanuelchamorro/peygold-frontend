import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyQrScannerComponent } from './eu-pey-qr-scanner.component';

describe('EuPeyQrScannerComponent', () => {
  let component: EuPeyQrScannerComponent;
  let fixture: ComponentFixture<EuPeyQrScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyQrScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyQrScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

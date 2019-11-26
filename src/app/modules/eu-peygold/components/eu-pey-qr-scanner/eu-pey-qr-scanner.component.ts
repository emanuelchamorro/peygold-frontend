import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';

@Component({
  selector: 'app-eu-pey-qr-scanner',
  templateUrl: './eu-pey-qr-scanner.component.html',
  styleUrls: ['./eu-pey-qr-scanner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EuPeyQrScannerComponent implements OnInit {

  private camera = false;

  @ViewChild(QrScannerComponent, { static: true })
  private qrScannerComponent: QrScannerComponent;

  private video: any;

  public value: any;

  public validQR = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.video = choosenDev;
        } else {
          this.video = videoDevices[0];
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.proccess(result);
    });
  }

  activateCamera() {
    this.camera = true;
    this.qrScannerComponent.startScanning(this.video);
  }

  deactivateCamera() {
    this.camera = false;
    this.qrScannerComponent.stopScanning();
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('QR invalido.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.value = reader.result;
    };
  }

  readQR(e) {
    this.validQR = true;
    this.proccess(e.result);
  }

  proccess(qr: string) {
    console.log(qr);
  }
}

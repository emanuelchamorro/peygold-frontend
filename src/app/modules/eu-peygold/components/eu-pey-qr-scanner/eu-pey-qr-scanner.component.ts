import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Router } from '@angular/router';
import { routes } from '../../routes';
import { Transaction, TransactionType, User } from 'src/app/models';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { TransactionsService } from '../../services/transactions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-eu-pey-qr-scanner',
  templateUrl: './eu-pey-qr-scanner.component.html',
  styleUrls: ['./eu-pey-qr-scanner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EuPeyQrScannerComponent extends BaseComponent implements OnInit {

  private camera = false;


  @ViewChild(QrScannerComponent, { static: true })
  private qrScannerComponent: QrScannerComponent;
  private video: any;
  public value: any;
  public validQR = false;
  step: number = 1;
  public decode: any;
  private user: User;
  

  constructor(private renderer: Renderer2,
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private spinnerService:NgxSpinnerService) {

      super();
    }

  ngOnInit() {
    this.user = this.authService.user();

  }

  ngAfterViewInit(){

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
    }).catch(
      (error)=>{
        this.setError("Ha ocurrido un error. Camara no disponible.");
      }
    );

    this.qrScannerComponent.capturedQr.subscribe(result => { 
      console.log(result);
      
      this.deactivateCamera();
      if (this._isValidQR(JSON.parse(result))) {
        this.decode = JSON.parse(result);
        this.step++;
      }else{
        this.setError("El código QR no es válido.");
      }

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
      setTimeout(()=>{
        this.value=undefined;        
      },5000);
    };
  }

  readQR(e) {    
    
    if (this._isValidQR(JSON.parse(e.result))) {
      this.validQR = true;
      this.decode = JSON.parse(e.result);
      this.step++;
    } else {
      this.validQR = false;
      this.setError("El código QR no es válido.");
    }
  }

  _isValidQR(dataDecode: any) {

    if (dataDecode && dataDecode.fullName && dataDecode.email && dataDecode.payments && dataDecode.payments.length > 0) {
      return true;
    } else {
      return false;
    }
  }



  proccess(qrDecode: any) {
    const optionSelected = qrDecode.payments.length > 1 ? 3 : 1;
    this.spinnerService.show();
    this.transactionsService.sendPayment(optionSelected, this._paymentMapper(qrDecode)).then(
      (resp) => {
        this.spinnerService.hide();
        this.step++;
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No fué posible efectuar el pago.");
      }
    )
  }

  _paymentMapper(dataDecode: any) {
    const optionSelected = dataDecode.payments.length > 1 ? 3 : 1;
    let payment: any;
    if (optionSelected !== 3) {
      payment = new Transaction();
      payment.type = new TransactionType(dataDecode.payments[0].idTransactionType);
      payment.amount = dataDecode.payments[0].ammount;
      payment.sender = new User();
      payment.sender.email = this.user.email;
      payment.receiver = new User();
      payment.receiver.email = dataDecode.email;
      payment.reason = 'Pago por codigo QR'
    } else {
      payment = new Transaction();
      payment.multiPey = new Array<Transaction>();

      let payment1 = new Transaction();
      payment1.type = new TransactionType(dataDecode.payments[0].idTransactionType);
      payment1.amount = dataDecode.payments[0].ammount;

      let payment2 = new Transaction();
      payment2.type = new TransactionType(dataDecode.payments[1].idTransactionType);
      payment2.amount = dataDecode.payments[1].ammount;

      payment.multiPey.push(payment1);
      payment.multiPey.push(payment2);

      payment.receiver = new User();
      payment.receiver.email = dataDecode.email;
      payment.reason = 'Pago por codigo QR'
    }
    console.log('payment', payment);
    return payment;

  }


  back() {
    this.step--;
  }

  send() {
    this.proccess(this.decode);
  }



}

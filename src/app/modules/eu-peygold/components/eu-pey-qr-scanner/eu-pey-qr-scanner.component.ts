import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Transaction, TransactionType, User } from 'src/app/models';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-eu-pey-qr-scanner',
  templateUrl: './eu-pey-qr-scanner.component.html',
  styleUrls: ['./eu-pey-qr-scanner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EuPeyQrScannerComponent implements OnInit {

  private camera = false;
  private user: User;

  @ViewChild(QrScannerComponent, { static: true })
  private qrScannerComponent: QrScannerComponent;

  private video: any;

  public value: any;

  public validQR = false;

  constructor(private renderer: Renderer2,
              private authService: AuthService,
              private transactionsService:TransactionsService) { }

  ngOnInit() {
    this.user = this.authService.user();
    console.log('user',this.user)
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
      console.log(result);
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
    const dataDecode = JSON.parse(qr);
    if(this._isValidQR(dataDecode)){
      const optionSelected = dataDecode.payments.length > 1?3:1;
      
      this.transactionsService.sendPayment(optionSelected,this._paymentMapper(dataDecode)).then(
        (resp)=>{
          console.log('resp',resp);
        }
      ).catch(
        (error)=>{
          console.log('error',error);
        }
      )
    }else{
      console.log('El código QR no es válido');
    }
    
  }

  _paymentMapper(dataDecode: any){
    const optionSelected = dataDecode.payments.length > 1?3:1;
    let payment:any;
    if(optionSelected!==3){
      payment = new Transaction();
      payment.type = new TransactionType(dataDecode.payments[0].idTransactionType);
      payment.amount = dataDecode.payments[0].ammount;
      payment.sender = new User();
      payment.sender.email = this.user.email;
      payment.receiver =  new User();
      payment.receiver.email = dataDecode.email;
      payment.reason = 'Pago por codigo QR'
    }else{
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
    console.log('payment',payment);
    return payment;

  }

  _isValidQR(dataDecode:any){

    if(dataDecode && dataDecode.fullName && dataDecode.email && dataDecode.payments && dataDecode.payments.length >0){
       return true;
    }else{
      return false;
    }
  }


}

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


  @ViewChild(QrScannerComponent, { static: false }) qrScannerComponent: QrScannerComponent;
  @ViewChild('result', { static: false }) resultElement: ElementRef;
  @ViewChild('step1', { static: false }) step1: ElementRef;
  private video: any;
  public value: any;
  public validQR = false;
  step: number = 1;
  public decode: any;
  private user: User;
  private callReaderQR: boolean;

  private title: string;
  private message: string;
  private showImageBottom: boolean;
  private routeTo: string;
  private buttonLabel: string;

  //TODO: PARA LA NUEVA IMPLEMENTACION DE PAGO POR QR
  payments: any;
  private transaction: Transaction;


  constructor(private renderer: Renderer2,
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private spinnerService: NgxSpinnerService) {

    super();
  }

  ngOnInit() {
    this.user = this.authService.user();

  }

  ngAfterViewInit() {

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
      (error) => {
        this.setError("Ha ocurrido un error. Camara no disponible.");
      }
    );

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);

      this.deactivateCamera();
      if (this._isValidQR(JSON.parse(result))) {
        this.decode = JSON.parse(result);
        this.decode.fullName = atob(this.decode.fullName);
        //TODO: Consultar cobros pendientes mas recientes
        const haveCobros = false;
        if (haveCobros) {
          this.payments = [{ idTransactionType: 1, ammount: 1000 }];
          this.step = 3;
        } else {
          this.step = 2;
        }
      } else {
        this.setError("El código QR no es válido.");
      }

    });
  }

  /**
 * set transaction
 * @param transaction 
 */
  setTransaction(transaction: Transaction) {
    transaction.receiver = this.user;
    this.transaction = transaction;
    this.payments = JSON.parse(this.transaction.paymentsToQR);
    console.log(transaction)
    this.step++;
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
      this.setError("El código QR no es válido.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      try {
        this.callReaderQR = false;
        this.value = reader.result;
        this.validQR = true;
        console.log('value en preview', this.value)
        setTimeout(() => {
          if (!this.callReaderQR) {
            this.value = null;
            let element: Element = this.renderer.createElement('h5');
            element.innerHTML = "El código QR no es válido.";
            element.className = "invalid-feedback text-center";
            this.renderElement(element);
          }

        }, 500);
      } catch (error) {
        console.log('error', error);
      }


    };
  }

  readQR(e) {
    this.callReaderQR = true;
    if (this._isValidQR(JSON.parse(e.result))) {
      this.decode = JSON.parse(e.result);
      this.decode.fullName = atob(this.decode.fullName);
      const button1 = this.renderer.createElement('button');
      button1.className = "solid-blue-button";
      const buttonText1 = this.renderer.createText('Continuar');

      const button2 = this.renderer.createElement('button');
      button2.className = "white-button-border mr-4";
      const buttonText2 = this.renderer.createText('Cancelar');
      for (let node of this.resultElement.nativeElement.childNodes) {
        this.renderer.removeChild(this.resultElement.nativeElement, node);
      }
      this.renderer.appendChild(button1, buttonText1);
      this.renderer.appendChild(button2, buttonText2);
      this.renderer.appendChild(this.resultElement.nativeElement, button2);
      this.renderer.appendChild(this.resultElement.nativeElement, button1);
      this.renderer.listen(button2, 'click', () => this.cancel());
      this.renderer.listen(button1, 'click', () => this.nextStep());
    } else {
      let element: Element = this.renderer.createElement('h5');
      element.innerHTML = "El código QR no es válido.";
      element.className = "invalid-feedback text-center";
      this.renderElement(element);
    }

  }

  _isValidQR(dataDecode: any) {
    console.log('dataDecode ', dataDecode)
    if (dataDecode && dataDecode.fullName && dataDecode.email) {
      return true;
    } else {
      return false;
    }
  }

  renderElement(element) {
    for (let node of this.resultElement.nativeElement.childNodes) {
      this.renderer.removeChild(this.resultElement.nativeElement, node);
    }
    this.renderer.appendChild(this.resultElement.nativeElement, element);
  }

  cancel() {
    this.callReaderQR = false;
    window.location.reload();
  }

  nextStep() {
    this.callReaderQR = false;
    let firstDiv: HTMLElement = this.step1.nativeElement;
    firstDiv.style.removeProperty("visibility");
    firstDiv.style.setProperty('display', 'none');
    this.step++;
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
    // let firstDiv:HTMLElement = this.step1.nativeElement;
    // firstDiv.style.removeProperty("display");
    // firstDiv.style.setProperty('visibility','visible');
    this.step--;
  }

  send() {
    //this.proccess(this.decode);
    this.title = "¡El pago fue enviado!";
    this.message = `Has pagado exitosamente a <b>${this.decode.fullName}.</b> El importe total fue descontado de tu billetera Peygold,<br />verás la operacion reflejada en "Movimientos"`;
    this.showImageBottom = false;
    this.routeTo = this.routes.home.href;
    this.buttonLabel = "Volver a inicio";

    this.step++;
  }



}

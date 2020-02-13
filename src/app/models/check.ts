import {Model} from './model';
import {User} from './user';
import {TransactionType} from './transaction-type';
import {LoanStatus} from './loan-status';
import {CheckRescue} from './check-rescue';
import {PaymentMethod} from './payment-method';
import {CreditDestination} from './credit-destination';
import {Bank} from './bank';
import {Address} from './address';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * Loan model
 */
export class Check extends Model {
  public id: number;
  public number: string;
  public accountNumber: number;
  public issuanceDateStr: string;
  public expirationDateStr: string;
  public issuanceDate: NgbDateStruct;
  public expirationDate: any;
  public amount: number;
  public onwer: User;
  public bank: Bank;
  public address: Address;
  public frontImage: string;
  public fileNameFront: string;
  public backImage: string;
  public fileNameback: string;
  public isValid: boolean;
  public gender:number;

  public paymentDate: Date;
  public checkStatusUpdate:number;


  get isComplete(): boolean{
    if(this.gender==2){
      if(this.accountNumber && this.number && this.amount && this.issuanceDate && this.expirationDate && this.bank.value && 
        this.address.state.value && this.address.city.value && this.address.addressFull &&
        this.address.phone && this.onwer.bussinessName && this.onwer.cuit &&
        this.onwer.fullName && this.onwer.documentNumber && this.onwer.phone && this.frontImage && this.backImage){
          this.isValid = true;
          return true;
      }else{
          this.isValid = false;
          return false;
      }
    }else{
      if(this.accountNumber && this.number && this.amount && this.issuanceDate && this.expirationDate && this.bank.value && 
        this.address.state.value && this.address.city.value && this.address.addressFull &&
        this.address.phone &&
        this.onwer.fullName && this.onwer.documentNumber && this.onwer.cuit  && this.onwer.email && this.onwer.phone && this.frontImage && this.backImage){
          this.isValid = true;
          return true;
      }else{
          this.isValid = false;
          return false;
      }
    }

  }

  checkCopy(check:Check):void{
    this.accountNumber = check.accountNumber;
    this.number = check.number;
    this.issuanceDateStr = check.issuanceDateStr;
    this.issuanceDate = check.issuanceDate;
    this.expirationDateStr = check.expirationDateStr;
    this.amount = check.amount;
    this.bank = check.bank;
    this.address = check.address;
    this.onwer = check.onwer;
    this.frontImage = check.frontImage;
    this.fileNameFront = check.fileNameFront;
    this.backImage = check.backImage;
    this.fileNameback = check.fileNameback;
  }

}


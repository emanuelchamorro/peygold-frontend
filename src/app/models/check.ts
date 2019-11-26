import {Model} from './model';
import {User} from './user';
import {TransactionType} from './transaction-type';
import {LoanStatus} from './loan-status';
import {CheckRescue} from './check-rescue';
import {PaymentMethod} from './payment-method';
import {CreditDestination} from './credit-destination';
import {Bank} from './bank';

/**
 * Loan model
 */
export class Check extends Model {
  public id: number;
  public number: string;
  public issuanceDate: string;
  public expirationDate: string;
  public amount: number;
  public onwer: User;
  public bank: Bank;
  public frontImage: string;
  public backImage: string;
}


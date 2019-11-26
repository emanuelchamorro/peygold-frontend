/**
 * Loan model
 */
import {Loan} from './loan';
import {CreditDestination} from './credit-destination';
import {TransactionType} from './transaction-type';
import {TransactionTypeEnum} from '../enums';

export class LoanRequest extends  Loan {

  public creditDestination: CreditDestination;
  public amount: number;
  public notes: string;
  public transactionType = new TransactionType(TransactionTypeEnum.CreditPoints);
}

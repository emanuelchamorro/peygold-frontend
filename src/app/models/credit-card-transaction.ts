import {Transaction} from './transaction';
import {CreditCard} from './credit-card';

/**
 * Transaction model
 */
export class CreditCardTransaction extends Transaction {

  public creditCard: CreditCard;

  constructor() {
    super();
    this.creditCard = new CreditCard();
  }
}

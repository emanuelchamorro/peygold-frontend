import {Transaction} from './transaction';
import {CreditCard} from './credit-card';
import {AddMoneyTransaction} from './add-money-transaction';

/**
 * Transaction model
 */
export class CreditCardTransaction extends Transaction {

  public creditCard: CreditCard;

  constructor() {
    super();
    this.creditCard = new CreditCard();
  }

  /**
   * Cast the CreditCardTransaction to a AddMoneyTransaction
   */
  get addMoneyTransaction(): AddMoneyTransaction {
    return new AddMoneyTransaction(
      this.sender.email,
      this.amount,
      this.reason,
      this.creditCard.type,
      this.creditCard.token,
      Number(this.type.id)
    );
  }
}

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

  /**
   * Get the MercadPago transaction object to get the transaction token from MercadoPago platform.
   */
  get mercadoPagoTransaction(): object {
    return {
      paymentMethodId: this.creditCard.type,
      docType: this.creditCard.identificationType.id,
      docNumber: this.creditCard.identificationNumber,
      cardholderName: this.creditCard.holderName,
      cardExpirationMonth: this.creditCard.expirationMonth,
      cardExpirationYear: this.creditCard.expirationYear,
      securityCode: this.creditCard.securityCode,
      cardNumber: this.creditCard.number,
      email: this.sender.email
    };
  }
}

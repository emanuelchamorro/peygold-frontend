import { Component, OnInit } from '@angular/core';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';
import {MercadoPago} from '../../../mercado-pago/services/mercado-pago.service';
import {IdentificationType} from '../../../mercado-pago/models/identification-type';
import {environment} from '../../../../../environments/environment';
import {CreditCardTransaction} from '../../../../models/credit-card-transaction';

@Component({
  selector: 'app-eu-pey-money-add-by-credit-card',
  templateUrl: './eu-pey-money-add-by-credit-card.component.html',
  styleUrls: ['./eu-pey-money-add-by-credit-card.component.scss']
})
export class EuPeyMoneyAddByCreditCardComponent extends EuPeyMoneyAddComponent implements OnInit {

  private step = 1;

  private identificationTypes: Array<IdentificationType>;

  protected transaction: CreditCardTransaction;

  constructor(
    private mercadoPago: MercadoPago
  ) {
    super();
    this.mercadoPago.setPublishableKey(environment.mercado_pago.publishable_key);
    this.mercadoPago.getIdentificationTypes().then((identificationTypes: Array<IdentificationType>) => {
      this.identificationTypes = identificationTypes;
    });
  }

  ngOnInit() {
    this.transaction = new CreditCardTransaction();
  }

  /**
   * Continue with the next step
   */
  continue() {
    this.step++;
  }

  /**
   * Go back with the previous step
   */
  back() {
    this.step--;
  }

  /**
   * Send the transaction.
   * @return void
   */
  sendTransaction() {
    console.log(this.transaction);
  }

  /**
   * On change the card number get the payment method.
   */
  onCardNumberChange(cardNumber: string): void {
    if (cardNumber && cardNumber.length > 6) {
      const bin = cardNumber.substring(0, 6);
      this.mercadoPago.getPaymentMethod({bin}).then((extraInfo) => {
          this.transaction.creditCard.extraInfo = extraInfo;
          this.transaction.creditCard.type = extraInfo.id;
          console.log(this.transaction);
      }).catch(() => {
        this.transaction.creditCard.extraInfo = null;
        this.transaction.creditCard.type = null;
      });
    }
  }
}

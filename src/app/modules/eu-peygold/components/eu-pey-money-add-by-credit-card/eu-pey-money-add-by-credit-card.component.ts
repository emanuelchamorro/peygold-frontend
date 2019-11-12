import { Component, OnInit } from '@angular/core';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';
import {MercadoPago} from '../../../mercado-pago/services/mercado-pago.service';
import {MercadoPagoService} from '../../services/mercado-pago.service';
import {IdentificationType} from '../../../mercado-pago/models/identification-type';
import {environment} from '../../../../../environments/environment';
import {CreditCardTransaction} from '../../../../models/credit-card-transaction';
import {Transaction, User} from '../../../../models';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {Message} from '../../../commons-peygold/entities/message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-eu-pey-money-add-by-credit-card',
  templateUrl: './eu-pey-money-add-by-credit-card.component.html',
  styleUrls: ['./eu-pey-money-add-by-credit-card.component.scss']
})
export class EuPeyMoneyAddByCreditCardComponent extends EuPeyMoneyAddComponent implements OnInit {

  private step = 1;

  private identificationTypes: Array<IdentificationType>;

  protected transaction: CreditCardTransaction;

  protected hasCardError = false;

  constructor(
    private mercadoPago: MercadoPago,
    private mercadoPagoService: MercadoPagoService,
    private authService: AuthService,
    protected router: Router,
  ) {
    super();
    this.mercadoPago.setPublishableKey(environment.mercado_pago.publishable_key);
    this.mercadoPago.getIdentificationTypes().then((identificationTypes: Array<IdentificationType>) => {
      this.identificationTypes = identificationTypes;
    });
  }

  setTransaction(transaction: Transaction) {
    const creditCadrdTransaction = new CreditCardTransaction();
    creditCadrdTransaction.type = transaction.type;
    creditCadrdTransaction.amount = transaction.amount;
    creditCadrdTransaction.sender = new User();
    creditCadrdTransaction.sender.email = this.authService.user().email;

    super.setTransaction(creditCadrdTransaction);
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}

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
   * Get the trasacion token
   */
  prepareTransaction() {
    this.mercadoPago.createToken(this.transaction.mercadoPagoTransaction).then((token: string) => {
      this.transaction.creditCard.token = token;
      this.continue();
    }).catch(() => {
      this.hasCardError = true;
    });
  }

  /**
   * Send the transaction or fail.
   * @return void
   */
  send(): void {
    this.mercadoPagoService.createPayment(this.transaction.addMoneyTransaction).then((success) => {
      if (!success) {
        this.showErrorFeedback(new Message(
          'Ha ocurrido un error al procesar su pago',
          'Por favor intente más tarde.'
        ));
        return;
      }

      this.showSuccessFeedback(new Message(
        '¡Ingresaste dinero exitosamente!',
        'Has ingresado dinero a tu cuenta de forma exitosa, ' +
        'y ya podes comenzar a realizar transacciones de manera fácil, cómoda y desde tu celular'
      ));
    });
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
      }).catch(() => {
        this.transaction.creditCard.extraInfo = null;
        this.transaction.creditCard.type = null;
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';
import {MercadoPago} from '../../../mercado-pago/services/mercado-pago.service';
import {MercadoPagoService} from '../../services/mercado-pago.service';
import {IdentificationType} from '../../../mercado-pago/models/identification-type';
import {environment} from '../../../../../environments/environment';
import {CreditCardTransaction} from '../../../../models/credit-card-transaction';
import {Transaction, User, CreditCard} from '../../../../models';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {Message} from '../../../commons-peygold/entities/message';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from 'src/app/models/card';
import { CardService } from '../../services/card.service';
import { CardFactory } from '../../../../factory/card-factory';

@Component({
  selector: 'app-eu-pey-money-add-by-credit-card',
  templateUrl: './eu-pey-money-add-by-credit-card.component.html',
  styleUrls: ['./eu-pey-money-add-by-credit-card.component.scss']
})
export class EuPeyMoneyAddByCreditCardComponent extends EuPeyMoneyAddComponent implements OnInit {

  public step = 1;

  private identificationTypes: Array<IdentificationType>;

  protected transaction: CreditCardTransaction;

  protected hasCardError = false;

  protected user: User;

  protected newCard:Card;

  private saveCard:boolean = false;

  constructor(
    private mercadoPago: MercadoPago,
    private mercadoPagoService: MercadoPagoService,
    private authService: AuthService,
    protected router: Router,
    private spinnerService:NgxSpinnerService,
    private cardService: CardService
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
  ngOnInit() {
    this.user = this.authService.user();
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
    this.step = 1;
  }

  /**
   * Get the trasacion token
   */
  prepareTransaction() {
      this.spinnerService.show();
    if(this.saveCard){
      this.cardService.createPostPayCard(CardFactory.makeCreditCardToEntity(this.transaction.creditCard)).then(
          (resp)=>{
            this.authService.reloadUser().then( (user: User) =>{ 
              this.user = this.authService.user();
              this.setSuccess('Tarjeta de credito fué registrada exitosamente.');
              this.saveCard = false;            
            })          
          }
        ).catch(
          (error)=>{
            this.saveCard = false;
            if(error.code == 400){
              this.setError(error.message);
            }else{
              this.setError('Ha ocurrido un error, tarjeta de credito no pudo ser registrada.');
            }
            
          }
        )
    }



    this.mercadoPago.createToken(this.transaction.mercadoPagoTransaction).then((token: string) => {
      this.transaction.creditCard.token = token;
      this.spinnerService.hide();
      this.continue();
    }).catch(() => {
      this.spinnerService.hide();
      this.hasCardError = true;
    });
  }

  /**
   * Send the transaction or fail.
   * @return void
   */
  send(): void {
    this.spinnerService.show();
    this.mercadoPagoService.createPayment(this.transaction.addMoneyTransaction).then((success) => {
      this.spinnerService.hide();
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

/**
 * proccess card saved to pay
 * @param card 
 */
  setCard(card:Card){

    if (card.number && card.number.length > 6) {
      this.spinnerService.show();
      card.number = card.number.replace(/ /g, "");
      const bin = card.number.substring(0, 6);
      //know Payment Method
      this.mercadoPago.getPaymentMethod({bin}).then((extraInfo) => {

          this.transaction.creditCard.extraInfo = extraInfo;
          this.transaction.creditCard.type = extraInfo.id;
          this.transaction.creditCard.identificationType = new IdentificationType();

          this.transaction.creditCard.identificationType.id = card.user.documentType.label;
          this.transaction.creditCard.identificationNumber = card.user.documentNumber;
          this.transaction.creditCard.holderName = card.user.name;
          this.transaction.creditCard.expirationMonth = card.monthExpiration;
          this.transaction.creditCard.expirationYear = card.yearExpiration;
          this.transaction.creditCard.securityCode = card.securityCode;
          this.transaction.creditCard.number = Number(card.number);

          //create token card
          this.mercadoPago.createToken(this.transaction.mercadoPagoTransaction).then((token: string) => {
            this.transaction.creditCard.token = token;
            this.spinnerService.hide();
            this.step = 3;
          }).catch(() => {
            this.spinnerService.hide();
            this.hasCardError = true;
          });


      }).catch(() => {
        this.spinnerService.hide();
        this.transaction.creditCard.extraInfo = null;
        this.transaction.creditCard.type = null;
      });
    }    
  }

  goToSetCardInfo(){
    this.transaction.creditCard = new CreditCard();
    this.newCard = new Card();
    this.step = 2;
  }
/**
 * delete postpay card
 * @param id 
 */
  deleteCard(id:number){
    this.spinnerService.show();
    this.cardService.deletePostPayCard(id).then(
      (resp)=>{

        this.authService.reloadUser().then( (user: User) =>{ 
          this.user = this.authService.user();
          this.spinnerService.hide();
          this.setSuccess('La tarjeta de crédito ha sido eliminada exitosamente.');
          this.saveCard = false;            
        })
        
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible elimanr la tarjeta de crédito.')
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { User } from '../../../../models/user';
import { BaseComponent } from '../base.component';
import { Address, State, City, Country, Transaction, TransactionType } from '../../../../models';
import { LocationService } from '../../../../services/location.service';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from 'src/app/models/card';
import { InMemoryService } from '../../../../services';
import { TransactionTypeEnum } from '../../../../enums';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent extends BaseComponent implements OnInit {

  public currentDate: Date = new Date();
  public user: User;
  public address: Address = new Address();
  public cardToActive: Card = new Card();
  public activeView: string = 'true';
  public sendTypeAddress: string;
  public confirmCardRequest: boolean;

  public stepConfirmCardRequest: number = 0;
  public stepactivateCard: number = 0;
  public stepPinUpdate: number = 0;
  public stepCardSuspend: number = 0;

  public transaction: Transaction;
  public transactionTypes: Array<TransactionType>;
  public multipey: boolean = false;

  private states: Array<State>;
  private cities: Array<City>;


  private title: string;
  private message: string;
  private showImageBottom: boolean;
  private buttonLabel: string;

  constructor(private authService: AuthService,
    private locationService: LocationService,
    private spinnerService: NgxSpinnerService,
    private inMemoryService: InMemoryService) {
    super();
  }

  ngOnInit() {
    this.sendTypeAddress = '0';
    this.spinnerService.show();
    this.user = this.authService.user();
    this.transaction = new Transaction();
    this.transaction.type = new TransactionType(TransactionTypeEnum.Fiat);
    this.transactionTypes = this.inMemoryService.transactionTypes(this.multipey);
    if (this.multipey) {
      this.transaction.multiPey = [
        Transaction.createFromType(TransactionTypeEnum.Fiat),
        Transaction.createFromType(TransactionTypeEnum.Points),
      ];
    }

    const country = new Country(environment.locations.default.id, environment.locations.default.label);
    this.locationService.getStates(country).then((states) => {
      this.states = states
      this.spinnerService.hide();
    });
  }

  /**
 * Get the cities by the selected  state
 * @return void
 */
  protected getCities(state: State): void {
    if (!state) {
      return;
    }
    this.requestCities(state).then();
  }

  /**
   * Request the states by the selected country
   * @param country The selected country
   */
  protected requestCities(state: State): Promise<Array<City>> {
    return this.locationService.getCities(state).then((cities: Array<City>) => {
      this.cities = cities;
      return cities;
    });
  }

  /**
   * confirm card request
   */
  preSendCardRequest() {
    this.confirmCardRequest = true;
  }


  /**
   * send card request
   */
  sendCardRequest() {

    this.title = "¡Tu tarjeta está en camino!";
    this.message = "La solicitud 12345678 ha sido procesada exitosamente.<br>Recibirás tu tarjeta prepaga en los próximos días hábiles";
    this.showImageBottom = false;
    this.buttonLabel = "Cerrar";
    this.stepConfirmCardRequest++;

  }
  /**
   * activate card user
   */

  activateCardUser() {
    this.title = "¡Tu tarjeta ha sido activada!";
    this.message = "Podras hacer uso";
    this.showImageBottom = false;
    this.buttonLabel = "Cerrar";
    this.stepactivateCard++;
  }

  /**
   * validate pass
   */
  validatePassword() {
    this.stepPinUpdate++;
  }

  /**
 * update pin
 */
  sendUpdatePin() {
    this.title = "¡Tu PIN ha sido actualizado!";
    this.message = "Podras hacer uso";
    this.showImageBottom = false;
    this.buttonLabel = "Cerrar";
    this.stepPinUpdate++;
  }
  /**
 * suapend card
 */
  sendSuspendCard() {
    this.title = "¡Tu tarjeta ha sido suspendida!";
    this.message = "Podras hacer uso";
    this.showImageBottom = false;
    this.buttonLabel = "Cerrar";
    this.stepCardSuspend++;
  }
  /**
 * suapend card
 */
  sendRecharge() {
    console.log(this.transaction);
    //this.transaction = transaction;
    /* this.transaction.originRecharge = new OriginTransactionType('8');
     this.spinnerService.show();
     this.transactionsService.createExternal(this.transaction).then(
       (resp)=>{
         console.log(resp);
         if(resp.success){
           this.spinnerService.hide();
           this.transaction.paymentCode = this.getRandomInt(100000,200000);
         }else{
           this.spinnerService.hide();
           this.setError("Ha ocurrido un error. No fué posible recargar tu billetera.");
         }
       }).catch(
         (error)=>{
           console.log(error);
           this.spinnerService.hide();
           this.setError("Ha ocurrido un error. No fué posible recargar tu billetera.");
       });*/
  }

}

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
import { CardService } from '../../services/card.service';


@Component({
  selector: 'app-eu-pey-card',
  templateUrl: './eu-pey-card.component.html',
  styleUrls: ['./eu-pey-card.component.scss']
})
export class EuPeyCardComponent extends BaseComponent implements OnInit {

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
  public stepRechargeView: number = 0;
  

  public transaction: Transaction;
  public transactionTypes: Array<TransactionType>;
  public multipey: boolean = false;

  private states: Array<State>;
  private cities: Array<City>;

  public cardSelected: Card;


  private title: string;
  private message: string;
  private showImageBottom: boolean;
  private buttonLabel: string;
  public userAccount: any;
  public repeatPasswordInput: string;
  public pin:any;

  constructor(private authService: AuthService,
    private locationService: LocationService,
    private spinnerService: NgxSpinnerService,
    private inMemoryService: InMemoryService,
    private cardService: CardService) {
    super();
  }

  ngOnInit() {
    this.sendTypeAddress = '0';
    this.spinnerService.show();
    this.userAccount = localStorage.getItem("hsu") ? JSON.parse(atob(localStorage.getItem("hsu"))) : undefined;
    this.user = this.authService.user();
    this.transaction = new Transaction();
    this.transaction.type = new TransactionType(TransactionTypeEnum.Fiat);
    this.transactionTypes = this.inMemoryService.transactionTypeFiat();
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
    let requestInfo;
    if(this.activeView){
      requestInfo =  {
        street: this.user.address.street,
        floor: this.user.address.floor,
        homeNumber : this.user.address.houseNumber,
        postalCode : this.user.address.zipCode,
        creditCardType : 2,
        city : this.user.address.city.value
      }
    }else{
      requestInfo =  {
        street: this.address.street,
        floor: this.address.floor,
        homeNumber : this.address.houseNumber,
        postalCode : this.address.zipCode,
        creditCardType : 2,
        city : this.address.city.value
      }
    }
    this.spinnerService.show();
    this.cardService.requestPrepaidCard(requestInfo).then(
      (resp)=>{
       
        console.log(resp);        
        if(resp.code == 422){
          this.spinnerService.hide();
          this.confirmCardRequest = false;
          const response = JSON.parse(resp.message);
          console.log(resp);
        }else{
          this.authService.reloadUser().then( (user: User) =>{ 
            this.user = this.authService.user();
            this.spinnerService.hide();
            this.title = "¡Tu tarjeta está en camino!";
            this.message = `La solicitud ${resp.idRequestPrepaidCard} ha sido procesada exitosamente.<br>Recibirás tu tarjeta prepaga en los próximos días hábiles`;
            this.showImageBottom = false;
            this.buttonLabel = "Cerrar";
            this.stepConfirmCardRequest++;
            
          })

        }
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        console.log(error);
        this.setError('Ha ocurrido un error. No fué posible procesar su solicitud.');
        
      }
    );



  }
  /**
   * activate card user
   */

  activateCardUser() {
    this.spinnerService.show();
    let requestInfo = {
      CardNumber: this.cardToActive.number,
      YearExpiration: this.cardToActive.yearExpiration,
      MonthExpiration : this.cardToActive.monthExpiration,
      Pin : this.cardToActive.pin,
      SecurityCode : this.cardToActive.securityCode
    }    
    this.cardService.activateCard(requestInfo).then(
      (resp:any)=>{
        
        this.spinnerService.hide();
        if(resp.code == 404){
          console.log('resp.message',resp.message);
          this.setInputError(resp.message);
        }else{
          this.authService.reloadUser().then( (user: User) =>{ 
            this.user = this.authService.user();
            this.title = "¡Tu tarjeta ha sido activada!";
            this.message = "Podras hacer uso";
            this.showImageBottom = false;
            this.buttonLabel = "Cerrar";
            this.stepactivateCard++;            
          });
        }

      }
    ).catch(
      (error:any)=>{
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible activar la tarjeta.');
      }
    );


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
    this.spinnerService.show();
    let requestInfo = {
        pinNuevo: this.pin,
        idTarjeta: this.user.currentCard.id
    }

    this.cardService.updatePin(requestInfo).then(
      (resp:any)=>{
        this.spinnerService.hide();
        this.authService.reloadUser().then( (user: User) =>{ 
          this.user = this.authService.user();
          this.title = "¡Tu PIN ha sido actualizado!";
          this.message = "Podras hacer uso";
          this.showImageBottom = false;
          this.buttonLabel = "Cerrar";
          this.stepPinUpdate++;           
        });
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible actualizar el pin.');
      }
    );


  }

/**
 * suapend card
 */
  sendSuspendCard() {
    this.spinnerService.show();
    this.cardService.suspendCard(this.user.currentCard.id).then(
      (resp)=>{
        this.spinnerService.hide();
        console.log('resp',resp);
        this.authService.reloadUser().then( (user: User) =>{ 
          this.user = this.authService.user();
          this.title = "¡Tu tarjeta ha sido suspendida!";
          this.message = "Ya no podras hacer uso";
          this.showImageBottom = false;
          this.buttonLabel = "Cerrar";
          this.stepCardSuspend++;          
        })
      }
    ).catch(
      (error)=>{
        console.log('error',error);
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible suspender la tarjeta.');
      }
    )
  }

  /**
 * send recharge card
 */
  sendRecharge() {
    this.spinnerService.show();
    let requestInfo ={
      idTarjeta:this.user.currentCard.id, 
      amount: this.transaction.amount,
      tipoTransaccion: this.transaction.type.value
    }

     this.cardService.cardRecharge(requestInfo).then(
       (resp)=>{
         console.log(resp);
         this.spinnerService.hide();

         this.authService.reloadUser().then( (user: User) =>{ 
          this.user = this.authService.user();
          this.title = "¡Listo!";
          this.message = `Recargaste tu tarjeta. El importe fue descontado de tu Billetera Pesos.`;
          this.showImageBottom = false;
          this.buttonLabel = "Cerrar";
          this.stepRechargeView++;      
        })


       }).catch(
         (error)=>{
           console.log(error);
           this.spinnerService.hide();
           this.setError("Ha ocurrido un error. No fué posible recargar tu tarjeta.");
       });
  }


  showDetail(card:Card){
    this.cardSelected = card;
  }
}

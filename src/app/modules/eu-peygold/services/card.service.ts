import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import { Address, User } from '../../../models';
import { Card } from '../../../models/card';
import { CardType } from '../../../models/card-type';


@Injectable({
  providedIn: 'root'
})
export class CardService extends HttpService {

/**
 * request prepay card request
 * @param requestInfo 
 */
  requestPrepaidCard(requestInfo:any): Promise<any>{
   return this.post('/tarjetas/SolicitarTarjeta',requestInfo).toPromise().then(
      (resp)=>{
        console.log(resp);
        return resp;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return error;
      }
    );
  }

  /**
   * activate card
   * @param requestInfo 
   */
  activateCard(requestInfo:any):Promise<any>{

    return this.post('/tarjetas/ActivarTarjeta',requestInfo).toPromise().then(
      (resp)=>{
        console.log(resp);
        return resp;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return error;
      }
    );
  }

/**
 * suspend card
 * @param id 
 */
  suspendCard(id:number): Promise<any>{

    return this.put('/tarjetas/SuspenderTarjeta',{idPrepaidCard:id}).toPromise().then(
      (resp)=>{
        console.log(resp);
        return resp;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return error;
      }
    );
  }

  /**
   * get all cards by user
   */
  getCards():Promise<Array<Card>>{
    let cards = new Array<Card>();
   return this.get('/tarjetas/GetTarjetasByUser').toPromise().then(
      (resp:any)=>{
        cards = resp.tarjetas.map((c:any)=>{
            let card = new Card();
            card.id = c.idTarjetaPrepaga;
            card.number = c.number;
            card.creditCardType = new CardType(c.cardType);
            card.securityCode = c.securityCode;
            card.amount = c.balance;
            card.pin = c.pin;
            card.yearExpiration = c.yearExpiration;
            card.monthExpiration = c.monthExpiration
            card.creationDate = c.fechaCreacion;
            card.user = new User();
            card.user.name = c.userTitular.name;
            card.user.lastName = c.userTitular.lastName;
            card.user.avatarURL = c.userTitular.avatarURL;
            card.user.fullName = c.userTitular.fullName;
            card.user.email =  c.userTitular.email;

            return card;
        })
        return cards
      }
    ).catch(
      (error)=>{
        return null;
      }
    );

  }

/**
 * card recharge
 * @param requestInfo 
 */
  cardRecharge(requestInfo:any):Promise<any>{
    return this.post('/tarjetas/Transferir', requestInfo).toPromise().then(
      (resp:any)=>{
        return resp;
      }
    ).catch(
      (error:any)=>{
        return error;
      }
    )
  }

  /**
   * update pin
   * @param requestInfo 
   */
  updatePin(requestInfo:any):Promise<any>{
    return this.put('/tarjetas/ModificarPin',requestInfo).toPromise().then(
      (resp:any)=>{
          return resp;
      }
    ).catch(
      (error)=>{
        return error;
      }
    );
  }

}

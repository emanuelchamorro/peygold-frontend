import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import { Address, User } from '../../../models';
import { Card } from '../../../models/card';


@Injectable({
  providedIn: 'root'
})
export class CardService extends HttpService {


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

  getCards():Promise<Array<Card>>{
    let cards = new Array<Card>();
   return this.get('/tarjetas/GetTarjetasByUser').toPromise().then(
      (resp:any)=>{
        cards = resp.tarjetas.map((c:any)=>{
            let card = new Card();
            card.id = c.idTarjetaPrepaga;
            card.number = c.number;
            card.creditCardType = c.cardType;
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

}

import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import { Address, User, Transaction } from '../../../models';
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

  /**
   * get card info by id
   * @param id 
   */
  getCardById(id:number):Promise<Card>{
    let card = new Card();
    return this.get(`/tarjetas/GetInformacionTarjetaById/${id}`).toPromise().then(
      (resp:any)=>{
        if(resp){
          card.id = resp.tarjetaDTO.idTarjetaPrepaga;
          card.number = resp.tarjetaDTO.number;
          card.creditCardType = new CardType(resp.tarjetaDTO.cardType);
          card.securityCode = resp.tarjetaDTO.securityCode;
          card.amount = resp.tarjetaDTO.balance;
          card.pin = resp.tarjetaDTO.pin;
          card.yearExpiration = resp.tarjetaDTO.yearExpiration;
          card.monthExpiration = resp.tarjetaDTO.monthExpiration
          card.creationDate = resp.tarjetaDTO.fechaCreacion;
          card.user = new User();
          card.user.name = resp.tarjetaDTO.userTitular.name;
          card.user.lastName = resp.tarjetaDTO.userTitular.lastName;
          card.user.avatarURL = resp.tarjetaDTO.userTitular.avatarURL;
          card.user.fullName = resp.tarjetaDTO.userTitular.fullName;
          card.user.email =  resp.tarjetaDTO.userTitular.email;
          card.transactions = new Array<Transaction>();
          card.transactions = resp.movements.map((item:any)=>{
            let transaction = new Transaction();
            transaction.id = item.idTransaccion;
            transaction.description = item.descripcion;
            transaction.reason = item.tipoMovimiento;
            transaction.createdAt = item.fecha;
            transaction.totalAmount =item.balance;
            transaction.amount = item.monto;
            return transaction;
          })
        }

        return card;
    }
    ).catch(
      (error)=>{
        return card;
      }
    );
  }

/*  {

    "movements": [
        {
            "descripcion": "Solicitud de tarjeta",
            "tipoMovimiento": "Solicitud",
            "fecha": "2020-11-24T15:02:55.7172363",
            "balance": 0.0,
            "monto": 0.0
        },
        {
            "idTransaccion": 39,
            "descripcion": "Activacion de tarjeta",
            "tipoMovimiento": "Activación",
            "fecha": "2020-11-27T16:06:28.0926921",
            "balance": 0.0,
            "monto": 0.0
        },
        {
            "idTransaccion": 40,
            "descripcion": "Recarga de tarjeta",
            "tipoMovimiento": "Recargas",
            "fecha": "2020-11-27T16:36:57.4605543",
            "balance": 1000.0,
            "monto": 1000.0
        },
        {
            "idTransaccion": 41,
            "descripcion": "Recarga de tarjeta",
            "tipoMovimiento": "Recargas",
            "fecha": "2020-11-27T16:40:06.5350697",
            "balance": 2270.0,
            "monto": 1270.0
        },
        {
            "idTransaccion": 42,
            "descripcion": "Recarga de tarjeta",
            "tipoMovimiento": "Recargas",
            "fecha": "2020-11-27T16:41:58.3341475",
            "balance": 4270.0,
            "monto": 2000.0
        },
        {
            "idTransaccion": 43,
            "descripcion": "Recarga de tarjeta",
            "tipoMovimiento": "Recargas",
            "fecha": "2020-11-27T17:09:33.2652805",
            "balance": 7270.0,
            "monto": 3000.0
        },
        {
            "idTransaccion": 44,
            "descripcion": "Recarga de tarjeta",
            "tipoMovimiento": "Recargas",
            "fecha": "2020-11-27T17:11:17.2835719",
            "balance": 8540.0,
            "monto": 1270.0
        },
        {
            "idTransaccion": 45,
            "descripcion": "Recarga de tarjeta",
            "tipoMovimiento": "Recargas",
            "fecha": "2020-11-30T06:43:21.7115391",
            "balance": 9540.0,
            "monto": 1000.0
        },
        {
            "idTransaccion": 46,
            "descripcion": "Modifcacion de Pin",
            "tipoMovimiento": "ModificacionPIN",
            "fecha": "2020-11-30T14:36:50.4563855",
            "balance": 9540.0,
            "monto": 0.0
        },
        {
            "idTransaccion": 47,
            "descripcion": "Recarga de tarjeta",
            "tipoMovimiento": "Recargas",
            "fecha": "2020-11-30T14:45:03.9788226",
            "balance": 10540.0,
            "monto": 1000.0
        },
        {
            "idTransaccion": 48,
            "descripcion": "Modifcacion de Pin",
            "tipoMovimiento": "ModificacionPIN",
            "fecha": "2020-11-30T14:53:43.3295071",
            "balance": 10540.0,
            "monto": 0.0
        },
        {
            "idTransaccion": 49,
            "descripcion": "Modifcacion de Pin",
            "tipoMovimiento": "ModificacionPIN",
            "fecha": "2020-11-30T15:00:52.8600774",
            "balance": 10540.0,
            "monto": 0.0
        }
    ]
  }*/







}

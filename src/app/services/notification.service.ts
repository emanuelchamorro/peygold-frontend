import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';
import { HttpService } from './http.service';

import { HttpClient } from '@angular/common/http';
import { InMemoryService } from './in-memory.service';
import { SelectOption, User } from '../models';
import { PaginationResponse } from '../modules/commons-peygold/entities/pagination-response';
import { NotificationCategory } from '../models/notification-category';
import { NotificationCategoryEnum } from '../enums/notification-category-enum';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService extends HttpService {

  public notifications = [

    {
      id: 1,
      title: 'Cobramos tu cheque',
      message: 'Detectamos una falta de pago en la cuota de credito, por lo que procedimos a cobrar el cheque correspondiente.',
      image: '/assets/images/new-icons/cheque.svg',
      date: new Date(),
      category: new SelectOption('1', 'transaccion'),
      status: false
    },
    {
      id: 2,
      title: 'Recordatorio de pago',
      message: 'La cuota de tu credito esta por vencer, recuerda abonarlo en termino para evitar problemas.',
      image: '/assets/images/new-icons/recordatorio.svg',
      date: new Date(),
      category: new SelectOption('1', 'Recordatorio'),
      status: false
    },
    {
      id: 3,
      title: 'Tu cuenta está verificada',
      message: 'Gracias por ayudarnos a hacer de Peygold un sitio más seguro.',
      image: '/assets/images/new-icons/check-01.svg',
      date: new Date(),
      category: new SelectOption('1', 'Verificacion de cuenta'),
      status: false
    },
    {
      id: 4,
      title: 'Te reintegraron dinero',
      message: 'El importe de la operacion #12345678 fue reintegrado a tu billetera.',
      image: '/assets/images/new-icons/reintegro.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },
    {
      id: 5,
      title: '¡Tu tarjeta prepaga está en camino!',
      message: 'Ya enviamos tu tarjeta, la recibiras en tu domicilio en los próximos dias hábiles.',
      image: '/assets/images/new-icons/tarjeta.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },
    {
      id: 6,
      title: 'Los P$G Créditos ya son tuyos',
      message: 'Aceptaste un remate, los P$G 8000 ya están acreditados en tu Billetera.',
      image: '/assets/images/new-icons/remate.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },
    {
      id: 7,
      title: 'Aceptaron tu oferta',
      message: 'Tus P$G Créditos fueron rematados exitosamente. Ya tenes el dinero acreditado en tu Billetera Pesos.',
      image: '/assets/images/new-icons/remate.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },
    {
      id: 8,
      title: 'Estas rematando',
      message: 'Tus P$G ya estan siendo rematados. Te notificaremos en cuanto alguien acepte tu oferta.',
      image: '/assets/images/new-icons/rematando.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },    
    {
      id: 9,
      title: 'Recibiste dinero',
      message: 'Lucia Chiesa te envió dinero. El importe ya está acreditado en tu Billetera.',
      image: 'https://wingman.mediumra.re/assets/img/avatar-female-1.jpg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },
    {
      id: 10,
      title: 'Tu solicitud de credito fue rechazada',
      message: 'No podemos otorgarte el crédito solicitado. Para mas información completa el <a>formulario de contacto</a>.',
      image: '/assets/images/new-icons/credito.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },    
    {
      id: 11,
      title: '¡Aprobaron tu Crédito!',
      message: 'En las próximas horas tendrás acreditados tus P$G créditos.',
      image: '/assets/images/new-icons/credito.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },    
    {
      id: 12,
      title: 'Rechazaron tu solicitud de dinero',
      message: 'Martin Goldberg rechazo tu solicitud de pago.',
      image: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%289%29.jpg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    },    
    {
      id: 13,
      title: 'Te pagaron',
      message: 'Lucia Chiesa acepto tu solicitud de pago',
      image: 'https://wingman.mediumra.re/assets/img/avatar-female-1.jpg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    }, 
    {
      id: 14,
      title: 'Ingresaste dinero',
      message: 'El importe fue acreditado exitosamente a tu billetera',
      image: '/assets/images/new-icons/ingresar-dinero.svg',
      date: new Date(),
      category: new SelectOption('1', 'Transaccion'),
      status: false
    }, 
    {
      id: 14,
      title: '¡Bienvenido!',
      message: 'Te registraste exitosamente en la plataforma',
      image: '/assets/images/new-icons/check-01.svg',
      date: new Date(),
      category: new SelectOption('1', 'registro'),
      status: false
    }, 
  ]


  constructor(
    protected http: HttpClient,
    protected inMemoryService: InMemoryService,
  ) {
    super(http);
  }

  /**
   * Get user notifications by user.
   * @param id identifier
   */
  all(page: number, perPage: number): Promise<PaginationResponse> {
      let paginationResponse = new PaginationResponse(page,perPage);
    return this.get(`/notification/${page}/${perPage}`).toPromise().then(
      (resp)=>{
        paginationResponse.count = resp.recordCount;
        paginationResponse.data = resp.notificationsDTO.map((item:any)=>{
          let notification = new Notification();
          notification.status = item.status;
          notification.date = item.date;
          notification.title = item.title;
          notification.message = item.bodyMessage;
          notification.category = new NotificationCategory(item.category);
          

          if(item.senderDTO){
            notification.sender = new User();
            notification.sender.id = item.senderDTO.id;
            notification.sender.email = item.senderDTO.email;
            notification.sender.avatarURL = environment.api.avatarUrl + item.senderDTO.avatar;
            notification.sender.fullName = item.senderDTO.fullname;
          }

          switch (String(item.category)) {
            case NotificationCategoryEnum.sistema:
              notification.image = '/assets/images/new-icons/movimientos.svg';
              break;
            case NotificationCategoryEnum.pagos:
              if(item.senderDTO){
                notification.image = notification.sender.avatarURL;
              }else{
                notification.image = '/assets/images/new-icons/solicitud-dinero.svg';
              }
              
              break;
            case NotificationCategoryEnum.tarjeta:
              notification.image = '/assets/images/new-icons/tarjeta.svg';
              break;
            case NotificationCategoryEnum.creditos:
              notification.image = '/assets/images/new-icons/credito.svg';
              break;
            case NotificationCategoryEnum.remates:
              notification.image = '/assets/images/new-icons/remate.svg';
              break;
           }

          return notification;
        })
        return paginationResponse;
      }
    ).catch(
      (error)=>{
        return paginationResponse;
      }
    );

  }

}

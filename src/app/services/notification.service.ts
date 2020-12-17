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
        console.log('resp notification', resp);
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
              notification.image = '/assets/images/new-icons/bienvenido.svg';
              break;
            case NotificationCategoryEnum.pagos:
              if(item.senderDTO){
                notification.image = notification.sender.avatarURL;
              }else{
                notification.image = '/assets/images/new-icons/pago-global.svg';
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
            case NotificationCategoryEnum.ingreso:
              notification.image = '/assets/images/new-icons/ingresar-dinero.svg';
              break; 
           }

          return notification;
        })
        return paginationResponse;
      }
    ).catch(
      (error)=>{
        console.log('resp notification', error);
        return paginationResponse;
      }
    );

  }

}

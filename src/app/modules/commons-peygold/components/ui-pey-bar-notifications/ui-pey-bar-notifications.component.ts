import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { environment } from '../../../../../environments/environment';
import { BaseComponent } from '../../components/base-component.component';
import { PaginationResponse } from '../../entities/pagination-response';

@Component({
  selector: 'app-ui-pey-bar-notifications',
  templateUrl: './ui-pey-bar-notifications.component.html',
  styleUrls: ['./ui-pey-bar-notifications.component.scss']
})
export class UiPeyBarNotificationsComponent extends BaseComponent implements OnInit {

  public notifications:PaginationResponse;
  public thereAreNotifications:boolean;
  public display:boolean;
    public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  constructor(public notificationService: NotificationService) { 
    super();

  }


  ngOnInit() {

     this.notificationService.all(1, environment.paginator.per_page).then(
      (response:PaginationResponse)=>{
        this.notifications = response;
        if (this.notifications.data && this.notifications.data.length > 0) {
          this.page = response.page;
          this.previousPage = 1;
          this.totalItems = response.count;
          this.showPagination = true;
          this.notifications.data = this.notifications.data.slice(0,3);
        } else {
          this.page = 1;
          this.previousPage = 1;
          this.totalItems = 0;
          this.showPagination = false;
        }
        this.thereAreNotifications = false;
      }
    );
  }

  displayNotifications():void{
    
    if(!this.display){
      this.notificationService.all(1, environment.paginator.per_page).then(
        (response:PaginationResponse)=>{
          this.notifications = response;
          if (this.notifications.data && this.notifications.data.length > 0) {
            this.page = response.page;
            this.previousPage = 1;
            this.totalItems = response.count;
            this.showPagination = true;
            this.display = !this.display;
            this.notifications.data = this.notifications.data.slice(0,3);
          } else {
            this.page = 1;
            this.previousPage = 1;
            this.totalItems = 0;
            this.showPagination = false;
            this.display = !this.display;
          }
          this.thereAreNotifications = false;
        }
      );
    }else{
      this.display = !this.display;
    }


  }

}

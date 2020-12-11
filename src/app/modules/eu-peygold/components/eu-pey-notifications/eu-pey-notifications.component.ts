import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { environment } from 'src/environments/environment';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';

@Component({
  selector: 'app-eu-pey-notifications',
  templateUrl: './eu-pey-notifications.component.html',
  styleUrls: ['./eu-pey-notifications.component.scss']
})
export class EuPeyNotificationsComponent extends BaseComponent implements OnInit {


  public notifications:PaginationResponse;
  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  constructor(public notificationService: NotificationService,
              private spinnerService:NgxSpinnerService) { 

                super();
              }

  ngOnInit() {
    this.spinnerService.show();
     this.notificationService.all(1, environment.paginator.per_page).then(
      (response:PaginationResponse)=>{
        this.notifications = response;
        if (this.notifications.data.length > 0) {
          this.page = response.page;
          this.previousPage = 1;
          this.totalItems = response.count;
          this.showPagination = true;
        } else {
          this.page = 1;
          this.previousPage = 1;
          this.totalItems = 0;
          this.showPagination = false;
        }
        this.spinnerService.hide();
      }
    );
  }


    /**
* load page de loans
* @param page 
*/
loadPage(page: number) {
  this.previousPage = page - 1;
  this.spinnerService.show();
  this.notificationService.all(page, environment.paginator.per_page).then(
    (response:PaginationResponse)=>{
      this.notifications = response;
      if (this.notifications.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }
  );
}

}

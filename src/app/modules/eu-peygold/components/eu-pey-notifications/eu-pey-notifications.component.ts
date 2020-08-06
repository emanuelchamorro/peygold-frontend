import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eu-pey-notifications',
  templateUrl: './eu-pey-notifications.component.html',
  styleUrls: ['./eu-pey-notifications.component.scss']
})
export class EuPeyNotificationsComponent extends BaseComponent implements OnInit {


  public notifications:Array<Notification>;

  constructor(public notificationService: NotificationService,
              private spinnerService:NgxSpinnerService) { 

                super();
              }

  ngOnInit() {
    this.spinnerService.show();
    this.notifications = this.notificationService.all(1, environment.paginator.per_page);
    this.spinnerService.hide();

  }

}

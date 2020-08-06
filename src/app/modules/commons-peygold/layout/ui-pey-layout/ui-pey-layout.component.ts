import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { environment } from '../../../../../environments/environment';
import { BaseComponent } from '../../components/base-component.component';

@Component({
  selector: 'app-ui-pey-layout',
  templateUrl: './ui-pey-layout.component.html',
  styleUrls: ['./ui-pey-layout.component.scss']
})
export class UIPeyLayoutComponent extends BaseComponent implements OnInit {

  public notifications:Array<Notification>;
  public thereAreNotifications:boolean;
  public display:boolean;

  constructor(public notificationService: NotificationService) { 

    super();
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.notifications = this.notificationService.all(1, environment.paginator.per_page).slice(0,3);
    this.thereAreNotifications = true;
  }

  displayNotifications():void{
    
    this.display = !this.display;

  }

}

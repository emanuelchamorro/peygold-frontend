import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../../../models/notification';
import { PaginationResponse } from '../../entities/pagination-response';
import { BaseComponent } from '../base-component.component';


@Component({
  selector: 'app-ui-pey-notifications',
  templateUrl: './ui-pey-notifications.component.html',
  styleUrls: ['./ui-pey-notifications.component.scss']
})
export class UiPeyNotificationsComponent extends BaseComponent implements OnInit {

  @Input()
  public notifications:PaginationResponse;

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}

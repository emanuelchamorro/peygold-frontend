import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../../../models/notification';


@Component({
  selector: 'app-ui-pey-notifications',
  templateUrl: './ui-pey-notifications.component.html',
  styleUrls: ['./ui-pey-notifications.component.scss']
})
export class UiPeyNotificationsComponent implements OnInit {

  @Input()
  public notifications:Array<Notification>;

  constructor() { }

  ngOnInit() {
  }

}

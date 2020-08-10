import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';


@Component({
  selector: 'app-ui-pe-pey-layout-qr',
  templateUrl: './ui-pe-pey-layout-qr.component.html',
  styleUrls: ['./ui-pe-pey-layout-qr.component.scss']
})
export class UiPePeyLayoutQrComponent implements OnInit {



  constructor(public notificationService: NotificationService) { 


  }

  /**
   * On init implementation
   */
  ngOnInit() {

  }

}

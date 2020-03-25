import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sc-pey-report-show-account-status',
  templateUrl: './sc-pey-report-show-account-status.component.html',
  styleUrls: ['./sc-pey-report-show-account-status.component.scss']
})
export class ScPeyReportShowAccountStatusComponent implements OnInit {

  @Input() detailedTransaction: any; //cambiar tipo

  constructor() { }

  ngOnInit() {
  }

}

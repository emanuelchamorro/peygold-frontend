import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../../../models/transaction';

@Component({
  selector: 'app-sc-pey-report-show-account-status',
  templateUrl: './sc-pey-report-show-account-status.component.html',
  styleUrls: ['./sc-pey-report-show-account-status.component.scss']
})
export class ScPeyReportShowAccountStatusComponent implements OnInit {

  @Input() detailedTransaction: Transaction; //cambiar tipo

  constructor() { }

  ngOnInit() {
  }

}

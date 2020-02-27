import { Component, OnInit, Input } from '@angular/core';
import { InsuranceCarrier } from '../../../../models/insurance-carrier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService, } from '../../../../services';
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import {City, State} from '../../../../models';

@Component({
  selector: 'app-sc-pey-show-insurancecarrier',
  templateUrl: './sc-pey-show-insurancecarrier.component.html',
  styleUrls: ['./sc-pey-show-insurancecarrier.component.scss']
})
export class ScPeyShowInsurancecarrierComponent implements OnInit {

  @Input() insuranceCarrier: InsuranceCarrier;

  constructor() { }

  ngOnInit() {
    if (this.insuranceCarrier) {
      return;
    }
  }

}

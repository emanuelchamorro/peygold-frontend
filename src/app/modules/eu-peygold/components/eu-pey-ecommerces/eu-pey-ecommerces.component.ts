import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { MapSearchService } from '../../../../services/map-search.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { ServiceCategoryService } from '../../../../services/service-category.service';
import { ServiceCategory } from '../../../../models/service-category';

@Component({
  selector: 'app-eu-pey-ecommerces',
  templateUrl: './eu-pey-ecommerces.component.html',
  styleUrls: ['./eu-pey-ecommerces.component.scss']
})
export class EuPeyEcommercesComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {

  }
  

}

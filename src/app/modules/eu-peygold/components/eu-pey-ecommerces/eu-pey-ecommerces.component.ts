import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { MapSearchService } from '../../../../services/map-search.service';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-eu-pey-ecommerces',
  templateUrl: './eu-pey-ecommerces.component.html',
  styleUrls: ['./eu-pey-ecommerces.component.scss']
})
export class EuPeyEcommercesComponent extends BaseComponent implements OnInit {


  protected filter: string = '';

  protected ecommerces: Array<any> = null;
  protected address: string = null;
  protected cityName: string = 'Caracas';


  constructor(private mapSearchService: MapSearchService,
    private spinnerService: NgxSpinnerService) {
    super();
  }

  ngOnInit() {
    this.mapSearchService.search('@', 1, environment.paginator.per_page).then(
      (response: PaginationResponse) => {
        if (response.data && response.data.length > 0) {
          this.ecommerces = response.data;
        } else {
          this.setError("No se tienen comercios registrados en nuestra red Peygold.");
        }
      }
    ).catch(
      (error) => {
        this.setError("Ha ocurrido un error. No será posible visualizar los comercios de nuestra red Peygold.");
      }
    )
  }


  loadPage(page: number) {
    let word = (this.filter && this.filter != '') ? this.filter : '@';
    //let word = (this.selectFilter && this.selectFilter != '') ? this.selectFilter : (this.filter && this.filter != '') ? this.filter : '@';
    this.spinnerService.show();
    this.mapSearchService.search(word, 1, environment.paginator.per_page).then(
      (response: PaginationResponse) => {

        if (response.data && response.data.length > 0) {
          this.ecommerces = response.data;
        } else {
          this.setError("No se tienen comercios registrados en nuestra red Peygold.");
        }
        this.spinnerService.hide();
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible visualizar los comercios de nuestra red Peygold.");
      }
    )
  }


  /**
   * search loans by word
   * @param filter 
   */

  search() {
    console.log('filter', this.filter);
    if (this.filter.length > 3) {
      this.loadPage(1);
    } else if (this.filter.length == 0) {
      this.filter = '';
      this.loadPage(1);
    }
  }

}

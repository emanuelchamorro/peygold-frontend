import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { MapSearchService } from '../../../../services/map-search.service';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { BaseComponent } from '../base.component';
import { Options, LabelType } from 'ng5-slider';
import { ServiceCategoryService } from '../../../../services/service-category.service';
import { ServiceCategory } from '../../../../models/service-category';

@Component({
  selector: 'app-eu-pey-ecommerces',
  templateUrl: './eu-pey-ecommerces.component.html',
  styleUrls: ['./eu-pey-ecommerces.component.scss']
})
export class EuPeyEcommercesComponent extends BaseComponent implements OnInit {


  protected filter: string = '';
  protected km: number = 5;
  options: Options = {
    floor: 1,
    ceil: 20,
    showTicks: true,
    showSelectionBar: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.High:
          return value + 'km';
        default:
          return value + 'km';
      }
    }

  };

  protected ecommerces: Array<any> = null;
  protected address: string = null;
  protected cityName: string = 'Caracas';
  protected serviceCategories: Array<ServiceCategory>;
  protected selectdFilterServiceCategory: string;


  constructor(private mapSearchService: MapSearchService,
    private spinnerService: NgxSpinnerService,
    private serviceCategoryService: ServiceCategoryService) {
    super();
  }

  ngOnInit() {

    this.serviceCategoryService.all().then((items: Array<ServiceCategory>) => {
      this.serviceCategories = items;
    });
    this.spinnerService.show();
    this.mapSearchService.search('@', 1, environment.paginator.per_page).then(
      (response: PaginationResponse) => {
        this.spinnerService.hide();
        if (response.data && response.data.length > 0) {
          this.ecommerces = response.data;
        } else {
          this.setError("No se tienen comercios registrados en nuestra red Peygold.");
        }
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible visualizar los comercios de nuestra red Peygold.");
      }
    )
  }

  /**
   * search with pagination
   * @param page 
   */

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

/**
 * search by km
 * @param event 
 */
  searchInKM(event: any) {
    console.log('event', event)
  }

  /**
* set filter 
* @param filter service category
*/
  setFilterServiceCategory(filter: string) {
    this.filter = null;
    this.selectdFilterServiceCategory = filter && filter != '-1' ? filter : null;
    console.log('category', this.selectdFilterServiceCategory)
    //this.loadPage(1);
  }

}
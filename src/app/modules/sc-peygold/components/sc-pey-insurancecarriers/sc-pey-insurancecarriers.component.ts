import { Component, OnInit } from '@angular/core';
import { InsuranceCarrier } from '../../../../models/insurance-carrier';
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import { environment } from '../../../../../environments/environment';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceCarrierFactory } from '../../../../factory/insurance-carrier-factory';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import {BaseComponent} from '../base.component';
import { LocationService, } from '../../../../services';
import {City, State} from '../../../../models';

@Component({
  selector: 'app-sc-pey-insurancecarriers',
  templateUrl: './sc-pey-insurancecarriers.component.html',
  styleUrls: ['./sc-pey-insurancecarriers.component.scss']
})
export class ScPeyInsurancecarriersComponent extends BaseComponent implements OnInit {

  private insurancecarriers: PaginationResponse;
  private detailedInsuranceCarrier: InsuranceCarrier;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;
  private exportAsConfig: ExportAsConfig;
  private completed:boolean;


  constructor(private insuranceCarrierService: InsuranceCarrierService,
    private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService,
    private locationService: LocationService) {       
      super();
    }
    

  ngOnInit() {
    this.completed = false;
    this.spinnerService.show();
    this.insuranceCarrierService.search(1, environment.paginator.per_page, undefined).then((response: PaginationResponse) => {
      this.insurancecarriers = response;
      if (this.insurancecarriers.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("No es posible cargar las aseguradoras.");
      }
    );
  }

  loadPage(page: number) {
    let word = (this.filter && this.filter != '') ? this.filter : undefined;
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.insuranceCarrierService.search(page, environment.paginator.per_page, word).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.insurancecarriers = response;

      if (this.insurancecarriers.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("No es posible cargar las aseguradoras.");
      }
    )

  }

  /**
   * Export the data to document.
   * @param type Exporting type
   * @return void
   */
  export(typeExport: any): void {
    console.log(typeExport);
    this.exportAsConfig = {
      type: typeExport, // the type you want to download
      elementId: 'tableInsurancecarriers', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Aseguradoras').subscribe(
      () => {},// save started
      (error) => {
        this.setError("No es posible exportar el reporte en el formato seleccionado.");
      }
      );
  }


  /**
   * Show the insuranceCarrier detail
   * @param insuranceCarrier The insuranceCarrier to show
   * @return void
   */
  showInsuranceCarrier(insuranceCarrier: InsuranceCarrier): void {
    this.getInsuranceCarrier(insuranceCarrier.id);
  }

  /**
   * Get the insurancecarrier info by the id.
   * @param id insurancecarrier id
  */
  private getInsuranceCarrier(id: number): void {
    this.spinnerService.show();
    this.insuranceCarrierService.getById(id).then((insurancecarrier: InsuranceCarrier) => {
      this.detailedInsuranceCarrier = insurancecarrier;
      console.log('detailedInsuranceCarrier', this.detailedInsuranceCarrier);
      if (this.detailedInsuranceCarrier.address.country) {
        this.locationService.getStates(this.detailedInsuranceCarrier.address.country).then((states: Array<State>) => {
          this.detailedInsuranceCarrier.address.state = states.filter( x=> x.value== this.detailedInsuranceCarrier.address.state.value)[0];
          if (this.detailedInsuranceCarrier.address.state) {
            this.locationService.getCities(this.detailedInsuranceCarrier.address.state).then((cities: Array<City>) => {
              this.completed = true;
              this.spinnerService.hide();
              this.detailedInsuranceCarrier.address.city = cities.filter( x=> x.value== this.detailedInsuranceCarrier.address.city.value)[0];
            }).catch( ()=> {
              this.spinnerService.hide();
              this.completed = false;
              this.setError("No es posible mostrar el detalle de la aseguradora.");
              });
          }
        }).catch( ()=> {
          this.spinnerService.hide();
          this.completed = false;
          this.setError("No es posible mostrar el detalle de la aseguradora.");
        });
      }
    });
  }

  /**
   * add insuranceCarrier 
   * @param insuranceCarrier The insuranceCarrier to add
   * @return void
   */
  add(insurancecarrier: InsuranceCarrier): void {
    insurancecarrier.deleted = false;
    this.insuranceCarrierService.update(InsuranceCarrierFactory.make(insurancecarrier)).then(
      (resp) => { }
    ).catch(
      (error) => { }
    );
  }

  /**
   * add insuranceCarrier 
   * @param insuranceCarrier The insuranceCarrier to delete
   * @return void
   */

  delete(insurancecarrier: InsuranceCarrier): void {
    insurancecarrier.deleted = true;
    this.insuranceCarrierService.update(InsuranceCarrierFactory.make(insurancecarrier)).then(
      (resp) => { }
    ).catch(
      (error) => { }
    );
  }

  /**
   * search by word 
   * @param filter The word to filter
   * @return void
   */
  search(filter: string): void {
    console.log('filter', this.filter);
    if (this.filter.length > 3) {
      this.loadPage(1);
    } else if (this.filter.length == 0) {
      this.filter = '';
      this.loadPage(1);
    }
  }

}

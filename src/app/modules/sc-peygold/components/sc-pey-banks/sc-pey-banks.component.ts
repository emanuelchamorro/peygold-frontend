import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { Bank } from '../../../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { BanksService } from '../../services/banks.service';
import { environment } from '../../../../../environments/environment';
import { LocationService, } from '../../../../services';
import {City, State} from '../../../../models';
import { BankFactory } from '../../../../factory/bank-factory';

@Component({
  selector: 'app-sc-pey-banks',
  templateUrl: './sc-pey-banks.component.html',
  styleUrls: ['./sc-pey-banks.component.scss']
})
export class ScPeyBanksComponent extends BaseComponent implements OnInit {

  private banks: PaginationResponse;
  private detailedBank: Bank;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;

  private exportAsConfig: ExportAsConfig;
  private completed:boolean;

  constructor(private spinnerService: NgxSpinnerService,
              private exportAsService: ExportAsService,
              private banksService:BanksService,
              private locationService: LocationService) {
    super();
  }

  ngOnInit() {
    this.completed = false;
    this.spinnerService.show();
    this.banksService.search(1,environment.paginator.per_page, undefined).then((response: PaginationResponse) => {
      this.banks = response;
      if (this.banks.data.length > 0) {
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
        this.setError("No es posible cargar los bancos.");
      }
    );
  }

  loadPage(page: number) {
    let word = (this.filter && this.filter != '') ? this.filter : undefined;
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.banksService.search(page, environment.paginator.per_page, word).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.banks = response;

      if (this.banks.data.length > 0) {
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
        this.setError("No es posible cargar los bancos.");
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
      elementId: 'tableBanks', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Bancos').subscribe(
      () => {},// save started
      (error) => {
        this.setError("No es posible exportar el reporte en el formato seleccionado.");
      }
      );
  }

  /**
   * Show the bank detail
   * @param bank The bank to show
   * @return void
   */
  showBank(bank: Bank): void {
    this.getBank(Number(bank.idBank));
  }

    /**
   * Get the bank info by the id.
   * @param id bank id
  */
  private getBank(id: number): void {

    this.spinnerService.show();
    this.banksService.getById(id).then((bank: Bank) => {
      if(bank){
        this.detailedBank = bank;
        console.log('bank', this.detailedBank);

       if (this.detailedBank.address.country) {
          this.locationService.getStates(this.detailedBank.address.country).then((states: Array<State>) => {
            this.detailedBank.address.state = states.filter( x=> x.value== this.detailedBank.address.state.value)[0];
            if (this.detailedBank.address.state) {
              this.locationService.getCities(this.detailedBank.address.state).then((cities: Array<City>) => {
                this.completed = true;
                this.spinnerService.hide();
                this.detailedBank.address.city = cities.filter( x=> x.value== this.detailedBank.address.city.value)[0];
              }).catch( ()=> {
                this.spinnerService.hide();
                this.completed = false;
                this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
                });
            }
          }).catch( ()=> {
            this.spinnerService.hide();
            this.completed = false;
            this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
          });
        }
      }else{
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
      }
    }).catch(
      (error)=>{
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
      }
    );
  }

    /**
   * add bank 
   * @param bank The bank to add
   * @return void
   */
  add(bank: Bank): void {
    bank.deleted = false;
    this.spinnerService.show();
    this.banksService.update(BankFactory.make(bank)).then(
      (bank:Bank) => {
        this.spinnerService.hide();
        if(!bank){
          this.setError("Ha ocurrido un error. No es posible agregar la entidad.");
        }

      }
    ).catch(
      (error) => { 
        this.setError("Ha ocurrido un error. No es posible agregar la entidad.");
      }
    );
  }

  /**
   * delete bank 
   * @param bank The bank to delete
   * @return void
   */

  delete(bank: Bank): void {
    bank.deleted = true;
    this.spinnerService.show();
    this.banksService.update(BankFactory.make(bank)).then(
      (bank:Bank) => { 
        this.spinnerService.hide();
        if(!bank){
          this.setError("Ha ocurrido un error. No es posible eliminar la entidad.");
        }
      }
    ).catch(
      (error) => { 
        this.setError("Ha ocurrido un error. No es posible eliminar la entidad.");
      }
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

import { Component, OnInit } from '@angular/core';
import { InsuranceCarrier } from '../../../../models/insurance-carrier';
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { LocationService} from '../../../../services';
import {City, Country, State, Bank } from '../../../../models';
import {BaseComponent} from '../base.component';
import { InsuranceCarrierFactory } from '../../../../factory/insurance-carrier-factory';
import { BanksService } from '../../../../services/banks.service';

@Component({
  selector: 'app-sc-pey-store-insurancecarrier',
  templateUrl: './sc-pey-store-insurancecarrier.component.html',
  styleUrls: ['./sc-pey-store-insurancecarrier.component.scss']
})
export class ScPeyStoreInsurancecarrierComponent extends BaseComponent implements OnInit {

  private insurancecarrier: InsuranceCarrier;
  private banks: Array<Bank>;
  private countries: Array<Country>;
  private states: Array<State>;
  private cities: Array<City>;
  private insurancecarrierId:number;


  constructor(private route: ActivatedRoute,
    private insuranceCarrierService: InsuranceCarrierService,
    private spinnerService: NgxSpinnerService,
    private locationService: LocationService,
    private bankService: BanksService) { 
      super();
      this.insurancecarrierId = Number(this.route.snapshot.paramMap.get('insurancecarrierId'));


    }

  ngOnInit() {
    this.banks = this.bankService.banksList;
    this.countries = this.locationService.countryList;
    if(this.insurancecarrierId && !isNaN(this.insurancecarrierId)){
      this.getInsuranceCarrier(this.insurancecarrierId);
      return;
    }

    this.insurancecarrier = new InsuranceCarrier();

  }


  /**
   * Store the insurancecarrier data
   * @param insurancecarrier the insurancecarrier to be stored.
   * @return void;
   */
  onSubmit(insurancecarrier: InsuranceCarrier){

    if(insurancecarrier.id){
     this.updateInsuranceCarrier(insurancecarrier);
      return;
    }
      this.createInsuranceCarrier(insurancecarrier);
  }

  /**
   * Store the insurancecarrier data
   * @param insurancecarrier the user to be created.
   * @return void;
   */
  private createInsuranceCarrier(insurancecarrier: InsuranceCarrier): void{
    this.spinnerService.show();
    this.insuranceCarrierService.store(InsuranceCarrierFactory.make(insurancecarrier)).then((resp: InsuranceCarrier)  => {
      this.spinnerService.hide();
      if(InsuranceCarrier){
        this.setSuccess('La aseguradora fué creada con exito.');
      }else{
        this.setError('Ha ocurrido un error. La aseguradora no pudo ser creada.');
      }
     
    }).catch((error) => {      
      this.spinnerService.hide();
      this.setError('Ha ocurrido un error. La aseguradora no pudo ser creada.');
    });
  }

    /**
   * Store the insurancecarrier data
   * @param insurancecarrier the user to be created.
   * @return void;
   */
  private updateInsuranceCarrier(insurancecarrier: InsuranceCarrier): void{
    this.spinnerService.show();
    this.insuranceCarrierService.update(InsuranceCarrierFactory.make(insurancecarrier)).then((resp: InsuranceCarrier)  => {
      this.spinnerService.hide();
      if(InsuranceCarrier){
        this.setSuccess("La aseguradora fué actualizada con exito.");
      }else{
        this.setError("Ha ocurrido un error. La aseguradora no pudo ser actualizada.");
      }
      
    }).catch((error) => {
      this.spinnerService.hide();
      this.setError("Ha ocurrido un error. La aseguradora no pudo ser actualizada.");
    });
  }


  /**
   * Remove the selected city
   * @return void
   */
  cleanCity(): void {
    this.insurancecarrier.address.city = null;
    this.cities = [];
  }

  /**
   * Remove the selected state
   * @return void
   */
  cleanState(): void {
    this.insurancecarrier.address.state = null;
    this.states = [];
  }

  /**
   * Get the insurancecarrier info by the id.
   * @param id insurancecarrier id
   */
  private getInsuranceCarrier(id: number): void {
    this.spinnerService.show();
    this.insuranceCarrierService.getById(id).then((insurancecarrier: InsuranceCarrier) => {
      if(insurancecarrier){
        if (insurancecarrier.address.country) {
          this.locationService.getStates(insurancecarrier.address.country).then((states: Array<State>) => {
            insurancecarrier.address.state = states.filter( x=> x.value== insurancecarrier.address.state.value)[0];
            if (insurancecarrier.address.state) {
              this.locationService.getCities(insurancecarrier.address.state).then((cities: Array<City>) => {
                insurancecarrier.address.city = cities.filter( x=> x.value== insurancecarrier.address.city.value)[0];
                this.insurancecarrier = insurancecarrier;
                this.spinnerService.hide();
              }).catch( ()=> {
                this.spinnerService.hide();
                this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
              });
            }
          }).catch( ()=> {
            this.spinnerService.hide();
            this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
          });
        }  
      }else{
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
      }
    }).catch(
      (error) => {
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
      }
    );;
  }

    /**
   * Get the states by the selected country
   * @return void;
   */
  getStates(): void {
    this.cleanState();
    this.cleanCity();
    if (this.insurancecarrier.address.country) {
      this.locationService.getStates(this.insurancecarrier.address.country).then((states: Array<State>) => {
        this.states = states;
      });
    }
  }

  /**
   * Get the cities by the selected  state
   * @return void
   */
  getCities(): void {
    this.cleanCity();
    if (this.insurancecarrier.address.state) {
      this.locationService.getCities(this.insurancecarrier.address.state).then((cities: Array<City>) => {
        this.cities = cities;
      });
    }
  }

}

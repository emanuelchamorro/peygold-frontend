import { Component, OnInit } from '@angular/core';
import { Bank, City, Country, State, } from '../../../../models';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService} from '../../../../services';


@Component({
  selector: 'app-sc-pey-store-bank',
  templateUrl: './sc-pey-store-bank.component.html',
  styleUrls: ['./sc-pey-store-bank.component.scss']
})
export class ScPeyStoreBankComponent extends BaseComponent implements OnInit {

  private bank: Bank;
  private bankId:number;
  private countries: Array<Country>;
  private states: Array<State>;
  private cities: Array<City>;

  constructor(private route: ActivatedRoute,    
              private spinnerService: NgxSpinnerService,
              private locationService: LocationService) {
    super();
    this.bankId = Number(this.route.snapshot.paramMap.get("bankId"));
  }

  ngOnInit() {
    this.countries = this.locationService.countryList;
    if(this.bankId && !isNaN(this.bankId)){
      console.log('bankId',this.bankId);
      this.getBank(this.bankId);
      return;
    }
    console.log('bankId',this.bankId);
    this.bank = new Bank();
    console.log('bankId',this.bank.id);
  }

    /**
   * Store the bank data
   * @param bank the bank to be stored.
   * @return void;
   */
  onSubmit(bank: Bank){

    if(bank.id){
     this.updateInsuranceCarrier(bank);
      return;
    }
      this.createInsuranceCarrier(bank);
  }


    /**
   * Store the bank data
   * @param bank the bank to be created.
   * @return void;
   */
  private createInsuranceCarrier(bank: Bank): void{
   /*this.spinnerService.show();
    this.insuranceCarrierService.store(InsuranceCarrierFactory.make(insurancecarrier)).then((resp: InsuranceCarrier)  => {
      this.spinnerService.hide();
      this.setSuccess('La aseguradora fué creada con exito.');
    }).catch((error) => {      
      this.spinnerService.hide();
      this.setError('La aseguradora no pudo ser creada.');
    });*/
  }

    /**
   * Store the bank data
   * @param bank the bank to be created.
   * @return void;
   */
  private updateInsuranceCarrier(bank: Bank): void{
   /* this.spinnerService.show();
    this.insuranceCarrierService.update(InsuranceCarrierFactory.make(insurancecarrier)).then((resp: InsuranceCarrier)  => {
      this.spinnerService.hide();
      this.setSuccess("La aseguradora fué actualizada con exito.");
    }).catch((error) => {
      this.spinnerService.hide();
      this.setError("La aseguradora no pudo ser actualizada.");
    });*/
  }

   /**
   * Remove the selected city
   * @return void
   */
  cleanCity(): void {
    this.bank.address.city = null;
    this.cities = [];
  }

  /**
   * Remove the selected state
   * @return void
   */
  cleanState(): void {
    this.bank.address.state = null;
    this.states = [];
  }

  /**
   * Get the bank info by the id.
   * @param id bank id
   */
  private getBank(id: number): void {
   /* this.spinnerService.show();
    this.insuranceCarrierService.getById(id).then((insurancecarrier: InsuranceCarrier) => {
      this.insurancecarrier = insurancecarrier;
      if (this.insurancecarrier.address.country) {
        this.locationService.getStates(this.insurancecarrier.address.country).then((states: Array<State>) => {
          this.insurancecarrier.address.state = states.filter( x=> x.value== this.insurancecarrier.address.state.value)[0];
          if (this.insurancecarrier.address.state) {
            this.locationService.getCities(this.insurancecarrier.address.state).then((cities: Array<City>) => {
              this.spinnerService.hide()
              this.insurancecarrier.address.city = cities.filter( x=> x.value== this.insurancecarrier.address.city.value)[0];
            }).catch( ()=> this.spinnerService.hide() );
          }
        }).catch( ()=> this.spinnerService.hide() );
      }
    });*/
  }

  /**
   * Get the states by the selected country
   * @return void;
   */
  getStates(): void {
    this.cleanState();
    this.cleanCity();
    if (this.bank.address.country) {
      this.locationService.getStates(this.bank.address.country).then((states: Array<State>) => {
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
    if (this.bank.address.state) {
      this.locationService.getCities(this.bank.address.state).then((cities: Array<City>) => {
        this.cities = cities;
      });
    }
  }


}

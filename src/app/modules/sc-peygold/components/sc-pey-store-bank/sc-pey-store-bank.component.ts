import { Component, OnInit } from '@angular/core';
import { Bank, City, Country, State, } from '../../../../models';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService} from '../../../../services';
import { BanksService } from '../../services/banks.service';
import { BankFactory } from '../../../../factory/bank-factory';


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
              private locationService: LocationService,
              private banksService:BanksService,) {
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
    if(bank.idBank){
     this.updateBank(bank);
      return;
    }
      this.createBank(bank);
  }


    /**
   * Store the bank data
   * @param bank the bank to be created.
   * @return void;
   */
  private createBank(bank: Bank): void{
   this.spinnerService.show();
    this.banksService.store(BankFactory.make(bank)).then((bank: Bank)  => {
      this.spinnerService.hide();
      if(bank){
        this.setSuccess('El banco fué creado con exito.');
      }else{
        this.setError('Ha ocurrido un error. El banco no pudo ser creado.');
      }
    }).catch((error) => {      
      this.spinnerService.hide();
      this.setError('Ha ocurrido un error. El banco no pudo ser creado.');
    });
  }

    /**
   * Store the bank data
   * @param bank the bank to be created.
   * @return void;
   */
  private updateBank(bank: Bank): void{
    this.spinnerService.show();
    this.banksService.update(BankFactory.make(bank)).then((bank: Bank)  => {
      this.spinnerService.hide();
      if(bank){
        this.setSuccess("El banco fué actualizado con exito.");
      }else{
        this.setError("Ha ocurrido un error. El banco no pudo ser actualizado.");
      }
    }).catch((error) => {
      this.spinnerService.hide();
      this.setError("Ha ocurrido un error. El banco no pudo ser actualizado.");
    });
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
    this.spinnerService.show();
    this.banksService.getById(id).then((bank: Bank) => {
      if(bank){
       if (bank.address.country) {
          this.locationService.getStates(bank.address.country).then((states: Array<State>) => {
            bank.address.state = states.filter( x=> x.value== bank.address.state.value)[0];
            if (bank.address.state) {
              this.locationService.getCities(bank.address.state).then((cities: Array<City>) => {
                bank.address.city = cities.filter( x=> x.value== bank.address.city.value)[0];
                this.bank = bank;
                this.spinnerService.hide();
              }).catch( ()=> {
                this.spinnerService.hide();
                this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
                });
            }
          }).catch( ()=> {
            this.spinnerService.hide();
            this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
          });
        }
      }else{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
      }
    }).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle del banco.");
      }
    );
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

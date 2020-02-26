import { Component, OnInit } from '@angular/core';
import { CheckRescue } from '../../../../models/check-rescue';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-sc-pey-store-rescue-check',
  templateUrl: './sc-pey-store-rescue-check.component.html',
  styleUrls: ['./sc-pey-store-rescue-check.component.scss']
})
export class ScPeyStoreRescueCheckComponent extends BaseComponent implements OnInit {

  checkRescue: CheckRescue;
  checkRescueId: number;

  constructor(private route: ActivatedRoute,    
    private spinnerService: NgxSpinnerService,) {
      super(); 
      this.checkRescueId = Number( this.route.snapshot.paramMap.get("rescuecheckId"));
    }

  ngOnInit() {

    if(this.checkRescueId && !isNaN(this.checkRescueId)){
      this.getCheckRescue(this.checkRescueId);
      return;
    }

    this.checkRescue = new CheckRescue();
  }


    /**
   * Get the checkRescue info by the id.
   * @param id checkRescue id
   */
  private getCheckRescue(id: number): void {
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
   * Store the bank data
   * @param bank the bank to be stored.
   * @return void;
   */
  onSubmit(checkRescue: CheckRescue){

    if(checkRescue.id){
     this.updateCheckRescue(checkRescue);
      return;
    }
      this.createCheckRescue(checkRescue);
  }


    /**
   * Store the bank data
   * @param bank the user to be created.
   * @return void;
   */
  private createCheckRescue(checkRescue: CheckRescue): void{
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
   * @param bank the user to be created.
   * @return void;
   */
  private updateCheckRescue(checkRescue: CheckRescue): void{
   /* this.spinnerService.show();
    this.insuranceCarrierService.update(InsuranceCarrierFactory.make(insurancecarrier)).then((resp: InsuranceCarrier)  => {
      this.spinnerService.hide();
      this.setSuccess("La aseguradora fué actualizada con exito.");
    }).catch((error) => {
      this.spinnerService.hide();
      this.setError("La aseguradora no pudo ser actualizada.");
    });*/
  }

}

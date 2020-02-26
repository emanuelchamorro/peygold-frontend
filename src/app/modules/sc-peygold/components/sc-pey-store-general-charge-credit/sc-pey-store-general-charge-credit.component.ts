import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralChargeCredit } from '../../../../models/general-charge-credit';
import { InMemoryService } from '../../../../services/in-memory.service';
import { EffectType } from '../../../../models/effect-type';
import { EffectApplicationType } from '../../../../models/effect-application-type';

@Component({
  selector: 'app-sc-pey-store-general-charge-credit',
  templateUrl: './sc-pey-store-general-charge-credit.component.html',
  styleUrls: ['./sc-pey-store-general-charge-credit.component.scss']
})
export class ScPeyStoreGeneralChargeCreditComponent extends BaseComponent implements OnInit {


  private generalChargeCredit: GeneralChargeCredit;
  private generalChargeCreditId: number;
  private effects: Array<EffectType>;
  private effectApplications: Array<EffectApplicationType>;

  constructor(private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private inMemoryService: InMemoryService) {
    super();

    this.generalChargeCreditId = Number(this.route.snapshot.paramMap.get("generalchargecreditId"));
  }

  ngOnInit() {
    this.effects = this.inMemoryService.loadEffectTypes;
    this.effectApplications = this.inMemoryService.loadEffectAplicationTypes;

    if (this.generalChargeCreditId && !isNaN(this.generalChargeCreditId)) {
      this.getGeneralChargeCredit(this.generalChargeCreditId);
      return;
    }

    this.generalChargeCredit = new GeneralChargeCredit();
  }



  /**
 * Get the generalChargeCredit info by the id.
 * @param id generalChargeCredit id
 */
  private getGeneralChargeCredit(id: number): void {
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
* Store the bgeneralChargeCreditnk data
* @param generalChargeCredit the generalChargeCredit to be stored.
* @return void;
*/
  onSubmit(generalChargeCredit: GeneralChargeCredit) {

    if (generalChargeCredit.id) {
      this.updateGeneralChargeCredit(generalChargeCredit);
      return;
    }
    this.createGeneralChargeCredit(generalChargeCredit);
  }


  /**
 * Store the generalChargeCredit data
 * @param generalChargeCredit the generalChargeCredit to be created.
 * @return void;
 */
  private createGeneralChargeCredit(generalChargeCredit: GeneralChargeCredit): void {
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
 * Store the generalChargeCredit data
 * @param generalChargeCredit the generalChargeCredit to be created.
 * @return void;
 */
  private updateGeneralChargeCredit(generalChargeCredit: GeneralChargeCredit): void {
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

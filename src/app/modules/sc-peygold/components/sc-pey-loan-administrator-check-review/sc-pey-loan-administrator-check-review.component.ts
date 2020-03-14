import { Component, OnInit } from '@angular/core';
import { Loan, Check, Bank, State, City, Country, } from '../../../../models';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { LoansService } from '../../services/loans.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BanksService } from '../../../../services/banks.service';
import { LocationService } from '../../../../services';
import { environment } from '../../../../../environments/environment';
import {CheckFactory} from '../../../../factory/check-factory';
import { CheckLog } from '../../../../models/check-logs';
import { Response } from '../../../../modules/commons-peygold/entities/response';

@Component({
  selector: 'app-sc-pey-loan-administrator-check-review',
  templateUrl: './sc-pey-loan-administrator-check-review.component.html',
  styleUrls: ['./sc-pey-loan-administrator-check-review.component.scss']
})
export class ScPeyLoanAdministratorCheckReviewComponent extends BaseComponent implements OnInit {

  private idLoan: number;
  private idCheck: number;
  public loanDetail: Loan;
  public check: Check;
  private banks: Array<Bank>;
  private states: Array<State>;
  private cities: Array<City>;
  private checkLogs:Array<CheckLog>;

  constructor(private route: ActivatedRoute,
    private loansService: LoansService,
    private spinnerService: NgxSpinnerService,
    private bankService: BanksService,
    private locationService: LocationService) {
    super();
    this.idLoan = Number(this.route.snapshot.paramMap.get("idLoan"));
    this.idCheck = Number(this.route.snapshot.paramMap.get("idCheck"));
  }

  ngOnInit() {
    this.spinnerService.show();
    this.banks = this.bankService.banksList;
    this.loansService.getById(this.idLoan).then(
      (response: Response) => {
        if(response.ok){
          this.loanDetail = response.data;        console.log('loanDetail', this.loanDetail);
          if (this.loanDetail.checks.length > 0) {
            const checksArray = this.loanDetail.checks.filter((check: Check) => check.id == this.idCheck);
            if (checksArray.length > 0) {
              this.check = checksArray[0];
              this.bankService.all().then((banks) => this.banks = banks);
              const country = new Country(environment.locations.default.id, environment.locations.default.label);
              this.locationService.getStates(country).then(
                (states) => {
                  this.states = states
                  const state = this.states.filter(x => x.value == this.check.address.state.value)[0];
                  this.check.address.state.label = state.label;
                  this.locationService.getCities(state).then((cities: Array<City>) => {
                    this.cities = cities;
                    const city = this.cities.filter(x => x.value == this.check.address.city.value)[0];
                    this.check.address.city.label = city.label;
                    this.spinnerService.hide();
                  });
                });
                this.loansService.getCheckLogs(this.check.id).then(
                  (resp)=>{
                    console.log(resp);
                    this.checkLogs = resp;
                    }
                ).catch(
                  (error)=>{
                    console.log(error);
                  } 
                );
            } else {
              this.spinnerService.hide();
              this.setError("El cheque no exite");
            }
          } else {
            this.spinnerService.hide();
            this.setError("La solicitud no tiene cheques asociados");
          }
        }else{
          this.setError(response.message);
        } 
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible ver el detalle.");
      }

    );
  }

  /**
 * Get the cities by the selected  state
 * @return void
 */
  protected getCities(state: State): void {
    if (!state) {
      return;
    }
    this.requestCities(state).then();
  }

  /**
 * Request the states by the selected country
 * @param country The selected country
 */
  protected requestCities(state: State): Promise<Array<City>> {
    return this.locationService.getCities(state).then((cities: Array<City>) => {
      this.cities = cities;
      return cities;
    });
  }

  continue() {
    this.spinnerService.show();
    this.loansService.updateCheck(CheckFactory.make(this.check)).then(
      (resp)=>{
        console.log(resp);
        this.spinnerService.hide();
        this.setSuccess('El cheque fué actualizado exitosamente.');
        this.getCheckLogs(this.check.id);
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible actualizar el cheque.');
      } 
    );
  }

  getCheckLogs(id:number){
    this.spinnerService.show();
    this.loansService.getCheckLogs(id).then(
      (resp)=>{
        console.log(resp);
        this.checkLogs = resp;
        this.spinnerService.hide();
        }
    ).catch(
      (error)=>{
        console.log(error);
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible listar los logs del cheque.');
      } 
    );
  }

}

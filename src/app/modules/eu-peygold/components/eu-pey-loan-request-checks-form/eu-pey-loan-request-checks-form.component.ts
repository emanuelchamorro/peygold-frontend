import { Component, OnInit, Input } from '@angular/core';
import {InMemoryService, LocationService} from '../../../../services';
import {LoanOption, Check, Bank, State, City, Country, LoanRequest} from '../../../../models';
import {BanksService} from '../../services/banks.service';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-eu-pey-loan-request-checks-form',
  templateUrl: './eu-pey-loan-request-checks-form.component.html',
  styleUrls: ['./eu-pey-loan-request-checks-form.component.scss']
})
export class EuPeyLoanRequestChecksFormComponent implements OnInit {

  @Input('loanRequest') loanRequest:LoanRequest;
  private loanOptions: Array<LoanOption>;
  private loanOption: LoanOption;
  private check: Check;
  private banks: Array<Bank>;
  private states: Array<State>;
  private cities: Array<City>;

  constructor(
    private inMemoryService: InMemoryService,
    private bankService: BanksService,
    private locationService: LocationService
  ) { }

  /**
   * On Init implementation
   */
  ngOnInit() {
    this.loanOptions = this.inMemoryService.loanOptions(this.loanRequest.amount);
    this.bankService.all().then((banks) => this.banks = banks);
    const country = new Country(environment.locations.default.id, environment.locations.default.label);
    this.locationService.getStates(country).then((states) => this.states = states);
  }

  /**
   * Select the loan option
   * @param option The selected loan option
   */
  selectOption(option: LoanOption): void {
    this.loanOption = option;
    this.check = option.checks[0];
  }

  /**
   * Set the current check to be updated.
   * @param check The check object
   */
  setCheck(check: Check): void {
    this.check = check;
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
}

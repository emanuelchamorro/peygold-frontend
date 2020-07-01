import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Address, City, Country, State, Transaction, User} from '../../../../models';
import {LocationService} from '../../../../services';
import {BaseComponent} from '../base-component.component';

@Component({
  selector: 'app-ui-pey-address-form',
  templateUrl: './ui-pey-address-form.component.html',
  styleUrls: ['./ui-pey-address-form.component.scss']
})
export class UIPeyAddressFormComponent extends BaseComponent implements OnInit {

  @ViewChild('addressForm',  { static: false }) form: any;

  @Output()
  public onSubmit: EventEmitter<Address> = new EventEmitter<Address>();

  @Output()
  public onChange: EventEmitter<Address> = new EventEmitter<Address>();

  @Input()
  public address: Address;

  @Input()
  public isBillingAddress: boolean;

  @Input()
  public editableUser: User;

  private editAddress: Address;

  protected countries: Array<Country> = [];
  protected states: Array<State> = [];
  protected cities: Array<City> = [];

  constructor(
    private locationService: LocationService,
  ) {
    super();
  }

  /**
   * On Init Implementation
   */
  ngOnInit() {
    this.editAddress = this.address;
    console.log('editableUser', this.editableUser);
    // Get the Countries
    this.locationService.getCountries().then((countries: Array<Country>) => {
      this.countries = countries;
      if (this.editAddress.country) {
        this.editAddress.country = countries.find((country: Country) => {
          return this.editAddress.country.value === country.value;
        });

        // Get the States
        this.requestStates(this.editAddress.country).then((states: Array<State>) => {
          if (this.editAddress.state) {
            this.editAddress.state = states.find((state: State) => {
              return this.editAddress.state.value === state.value;
            });

            // Get the Cities
            this.requestCities(this.editAddress.state).then((cities: Array<City>) => {
              if (this.editAddress.city) {
                this.editAddress.city = cities.find((city: City) => {
                  return this.editAddress.city.value === city.value;
                });
              }
            });
          }
        });
      }
    });
  }

  /**
   * Get the states by the selected country
   * @return void;
   */
  protected getStates(country: Country): void {
    this.cleanState();
    this.cleanCity();
    this.emitAddress();
    if (!country) {
      return;
    }
    if(!this.isBillingAddress){
      this.editableUser.prefixPhone = country.numericPrefix;
    }

    this.requestStates(country);
  }

  /**
   * Request the states by the selected country
   * @param country The selected country
   */
  protected requestStates(country: Country): Promise<Array<State>> {
    return this.locationService.getStates(country).then((states: Array<State>) => {
      this.states = states;
      return states;
    });
  }

  /**
   * Get the cities by the selected  state
   * @return void
   */
  protected getCities(state: State): void {
    this.cleanCity();
    this.emitAddress()
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

  /**
   * Remove the selected city
   * @return void
   */
  protected cleanCity(): void {
    this.editAddress.city = null;
    this.cities = [];
  }

  /**
   * Remove the selected state
   * @return void
   */
  protected cleanState(): void {
    this.editAddress.state = null;
    this.states = [];
  }

  /**
   *
   */
  public submit(): Address {
    this.form.onSubmit();

    if (this.form.valid) {
      this.onSubmit.emit(this.editAddress);
    }

    return null;
  }

  /**
   *
   */
  private emitAddress() {
    this.onChange.emit(this.editAddress);
  }
}

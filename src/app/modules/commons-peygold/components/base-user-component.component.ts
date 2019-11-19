import {BaseComponent} from './base-component.component';
import {Address, City, Country, DocumentType, Role, State, User} from '../../../models';
import {InMemoryService, LocationService} from '../../../services';
import {OnInit} from '@angular/core';

export class BaseUserComponent extends BaseComponent implements OnInit{

  protected user: User;
  protected countries: Array<Country> = [];
  protected states: Array<State>;
  protected cities: Array<City>;
  protected documentTypes: Array<DocumentType>;
  protected address: Address;
  protected billingAddress: Address;

  constructor(
    private locationService: LocationService,
    private inMemoryService: InMemoryService,
  ) {
    super();
    this.locationService.getCountries().then((countries: Array<Country>) => {
      this.countries = countries;
    });
    this.documentTypes = this.inMemoryService.documentTypes;
  }

  /**
   * On Init Implementation
   */
  ngOnInit() {
    if (this.user) {
      this.address = this.user.address;
      this.billingAddress = this.user.billingAddress;
    }
  }

  /**
   * Get the states by the selected country
   * @return void;
   */
  protected getStates(): void {
    this.cleanState();
    this.cleanCity();
    if (this.user.address.country) {
      this.locationService.getStates(this.user.address.country).then((states: Array<State>) => {
        this.states = states;
      });
    }
  }

  /**
   * Get the cities by the selected  state
   * @return void
   */
  protected getCities(): void {
    this.cleanCity();
    if (this.user.address.state) {
      this.locationService.getCities(this.user.address.state).then((cities: Array<City>) => {
        this.cities = cities;
      });
    }
  }

  /**
   * Remove the selected city
   * @return void
   */
  protected cleanCity(): void {
    this.user.address.city = null;
    this.cities = [];
  }

  /**
   * Remove the selected state
   * @return void
   */
  protected cleanState(): void {
    this.user.address.state = null;
    this.states = [];
  }
}

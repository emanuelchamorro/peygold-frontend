import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {Country} from '../models/country';
import {State} from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService {

  /**
   * Get the list of Country models
   */
  getCountries(): Promise<Country[]> {
    return this.get('/Location/GetCountries').toPromise().then((response) => {
      const countries = [];

      if (!response.value) {
        return countries;
      }

      response.value.map((country) => {
        countries.push(new Country(country.idCountry, country.name));
      });

      return countries;
    }).catch(e => {
      return [];
    });;
  }

  /**
   * Get the list of State models
   */
  getStates(country: Country): Array<State> {
    return this.get('/Location/GetStatesByCountry', {
      params : {
        idCountry : country.id
      }
    }).toPromise().then((response) => {
      console.log(response);
    });
  }

  /**
   * Get the list of City models
   */
  getCities(state: State): Array<State> {
    return this.get('/Location/GetCitiesByState', {
      params : {
        IdState : state.id
      }
    }).toPromise().then((response) => {
      console.log(response);
    });
  }
}

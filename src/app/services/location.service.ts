import { Injectable } from '@angular/core';
import {Country} from '../models/country';
import {State} from '../models/state';
import {City} from '../models/city';
import {ApiResponse} from './api-response';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends HttpService {

  public countries: Country[];

  /**
   * Get the list of Country models
   */
  getCountries(): Promise<Country[]> {
    if (this.countries) {
      return this.resolveWith(this.countries);
    }

    return this.get('/Location/GetCountries').toPromise().then((response: ApiResponse) => {
      this.countries = [];

      if (!response.value) {
        return this.countries;
      }

      response.value.map((country: any) => {
        this.countries.push(new Country(country.idCountry, country.name));
      });

      return this.countries;
    }).catch(e => {
      console.log(e);
      return this.countries;
    });
  }

  /**
   * Get the list of State models
   */
  getStates(country: Country): Promise<Array<State>> {
    return this.get('/Location/GetStatesByCountry', {
      params : {
        idCountry : country.id
      }
    }).toPromise().then((response: ApiResponse) => {
      const states = [];

      if (!response.value) {
        return states;
      }

      response.value.map((state: any) => {
        states.push(new Country(state.idState, state.name));
      });

      return states;
    }).catch(e => {
      console.log(e);
      return [];
    });
  }

  /**
   * Get the list of City models
   */
  getCities(state: State): Promise<Array<City>> {
    return this.get('/Location/GetCitiesByState', {
      params : {
        IdState : state.id
      }
    }).toPromise().then((response: ApiResponse) => {
      const cities = [];

      if (!response.value) {
        return cities;
      }

      response.value.map((city: any) => {
        cities.push(new Country(city.idCity, city.name));
      });

      return cities;
    }).catch(e => {
      console.log(e);
      return [];
    });
  }
}

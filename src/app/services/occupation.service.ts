import { Injectable } from '@angular/core';
import {ApiResponse} from './api-response';
import {Occupation} from '../models/occupation';
import {Country} from '../models/country';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OccupationService extends HttpService {

  public occupations: Array<Country>;

  /**
   * Get the list of Occupations models
   */
  all(): Promise<Array<Occupation>> {
    if (this.occupations) {
      return this.resolveWith(this.occupations);
    }

    return this.get('/Occupations').toPromise().then((response: ApiResponse) => {
      this.occupations = [];

      if (!response.value) {
        return this.occupations;
      }

      response.value.map((occupation: any) => {
        this.occupations.push(new Occupation(occupation.idOccupation, occupation.name));
      });

      return this.occupations;
    }).catch(e => {
      return this.occupations;
    });
  }
}

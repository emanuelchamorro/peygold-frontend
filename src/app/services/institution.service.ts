import { Injectable } from '@angular/core';
import {ApiResponse} from './api-response';
import {Institution} from '../models/institution';
import {Country} from '../models/country';
import {State} from '../models/state';
import {City} from '../models/city';
import {Address} from '../models/address';
import {ProfitInstitution} from '../models/profit-institution';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService extends HttpService {

  public institutions: Institution[];

  /**
   * Get the list of Institution models
   */
  all(): Promise<Array<Institution>> {
    if (this.institutions) {
      return this.resolveWith(this.institutions);
    }

    return this.get('/Institutions').toPromise().then((response: ApiResponse) => {
      this.institutions = [];

      if (!response.value) {
        return this.institutions;
      }

      response.value.map((data: any) => {
        const institution = new Institution();

        institution.id = data.userInfo.idUser;

        institution.bussinessName = data.userInfo.socialReason;
        institution.cuit = data.userInfo.cuit;
        institution.website = data.userInfo.institutionWebSite;
        institution.email = data.userInfo.email;
        institution.phone = data.userInfo.phone;
        institution.description = data.userInfo.description;
        institution.volunteerQuantity = data.userInfo.volunteerQuantity;
        institution.profitInstitution = new ProfitInstitution(data.userInfo.idInstitution);
        institution.idAspNetUser = data.userInfo.idAspNetUser;
        institution.peygoldCommission = data.userInfo.peygoldCommission;
        institution.commission = data.userInfo.institutionCommission;
        institution.idUserType = data.userInfo.idUserType;
        institution.newsLetter = data.userInfo.newsLetter;
        institution.tac = data.userInfo.tac;

        const address = data.address || data.adress;

        institution.address = new Address();
        institution.address.country = new Country(address.idCountry);
        institution.address.state = new State(address.idState);
        institution.address.city = new City(address.idCity);

        institution.address.street = address.street;
        institution.address.houseNumber = address.houseNumber;
        institution.address.buildingFloor = address.floor;
        institution.address.zipCode = address.postalCode;

        this.institutions.push(institution);
      });

      return this.institutions;
    }).catch(e => {
      return this.institutions;
    });
  }
}

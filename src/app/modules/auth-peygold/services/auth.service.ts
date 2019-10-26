import { Injectable } from '@angular/core';
import {Person} from '../../../models/person';
import {Company} from '../../../models/company';
import {Institution} from '../../../models/institution';
import {User} from '../../../models/user';
import {HttpService} from '../../../services/http.service';
import {Address} from '../../../models/address';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  /**
   * Register a new person in the platform
   * @param person The new user
   */
  signUpPerson(person: Person): Promise<boolean> {
    const userInfo = {
      ... this.buildPersonInfo(person),
      ... this.buildAddresses(person.address),
      ... this.buildUserSignIn(person)
    };

    console.log(userInfo);

    return this.post('/clients', userInfo).toPromise();;
  }

  /**
   * Register a new person in the platform
   * @param company The new user
   */
  signUpCompany(company: Company): Promise<boolean> {
    const userInfo = {
      ... this.buildCompanyInfo(company),
      ... this.buildAddresses(company.address),
      ... this.buildUserSignIn(company)
    };

    console.log(userInfo);

    return this.post('/commerces', userInfo).toPromise();
  }

  /**
   * Register a new person in the platform
   * @param institution The new user
   */
  signUpInstitution(institution: Institution): Promise<boolean> {
    const userInfo = {
      ... this.buildInstitutionInfo(institution),
      ... this.buildAddresses(institution.address),
      ... this.buildUserSignIn(institution)
    };

    console.log(userInfo);

    return this.post('/institutions', userInfo).toPromise();;
  }

  /**
   * App login.
   * @param user User to be authenticated.
   */
  login(user: User): Promise<User> {
    return this.resolveWith(new User());
  }

  /**
   * Build the person user info to be sent to the register user.
   */
  buildPersonInfo(person: Person): any {
    return {
      userInfo: {
        idUserType: '1',
        name: person.name,
        LastName: person.lastName,
        email: person.email,
        confirmEmail: person.email,
        phone: person.phone,
        tac: true,
        newsLetter: true,
        dni: person.documentType.id,
        CardId: person.documentNumber,
        idOccupation: person.occupation.id,
        idInstitution: person.profitInstitution.id
      }
    };
  }

  /**
   * Build the company user info to be sent to the register user.
   */
  buildCompanyInfo(company: Company): any {
    return {
      userInfo: {
        SocialReason: company.bussinessName,
        CUIT: company.cuit,
        email: company.email,
        confirmEmail: company.email,
        phone: company.phone,
        idInstitution: company.profitInstitution.id,
        TAC: true
      }
    };
  }

  /**
   * Build the company user info to be sent to the register user.
   */
  buildInstitutionInfo(institution: Institution): any {
    return {
      userInfo: {
        SocialReason: institution.bussinessName,
        CUIT: institution.cuit,
        email: institution.email,
        confirmEmail: institution.email,
        phone: institution.phone,
        InstitutionWebSite: institution.website
      }
    };
  }

  /**
   * Build the user.address info to be sent to the register user.
   */
  buildAddresses(address: Address): any {
    return {
      BillingAddress: {
        BillingStreet: address.street,
        BillingHouseNumber: address.houseNumber,
        BillingFloor: address.buildingFloor,
        BillingPostalCode: address.zipCode,
        idBillingCountry: address.country.id,
        idBillingState: address.state.id,
        idBillingCity: address.city.id
      },
      address: {
        street: address.street,
        houseNumber: address.houseNumber,
        floor: address.buildingFloor,
        postalCode: address.zipCode,
        idCountry: address.country.id,
        idState: address.state.id,
        idCity: address.city.id
      }
    };
  }

  /**
   * Build the user.userSignIn info to be sent to the register user.
   */
  buildUserSignIn(user: User): any {
    return {
      userSignIn: {
        password: user.password,
        confirmPassword: user.password
      }
    };
  }
}

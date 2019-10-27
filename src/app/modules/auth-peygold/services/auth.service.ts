import { Injectable } from '@angular/core';
import {Person} from '../../../models/person';
import {Company} from '../../../models/company';
import {Institution} from '../../../models/institution';
import {User} from '../../../models/user';
import {HttpService} from '../../../services/http.service';
import {Address} from '../../../models/address';
import {ApiResponse} from '../../../services/api-response';
import {City} from '../../../models';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  /**
   * App login.
   * @param user User to be authenticated.
   */
  login(email: string, password: string, rememberMe = false): Promise<User> {
    return this.post('/auth', {
      email,
      password,
      rememberMe
    }).toPromise().then((response: ApiResponse) =>{
      const value: any = response.value
      const user = new User();

      user.id = value.idUser;
      user.phone = value.phone;
      user.phone = value.phone;
      user.email = value.email;
      user.token = value.token;
      user.address = new Address();
      user.address.country = new City(value.idCountry, value.countryName);
      user.address.state = new City(value.idState, value.stateName);
      user.address.city = new City(value.idCity, value.cityName);
      user.address.street = value.street;
      user.address.houseNumber = value.houseNumber;
      user.avatar = environment.api.avatarUrl + value.avatarURL;

      /*
      "idAspNetUser": "ecb5ab29-c499-42d2-a6da-0309518e4ea0",
      "socialReason": null,
      "name": "Douglas",
      "firstName": "Douglas",
      "lastName": "Trejos",
      "idUserType": 1,
      "cuit": null,
      "idCountry": 3,
      "idInstitution": 225,
      "canChargePeygold": false,
      "employeeQuantity": 2,
      "annualIncome": 50000,
      "idPrimaryActivity": 1,
      "primaryActivityName": "Actividad Principal 1",
      "roles": ["Client"],
      "systemUserTypeId": 1
      */
      return user;
    });
  }

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

    return this.post('/clients', userInfo).toPromise();
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

    return this.post('/institutions', userInfo).toPromise();
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

  /**
   * Retrieve the token to start the password recovery.
   * @param email The user email
   */
  retrieveResetPasswordTokenByEmail(email: string): Promise<User> {
    return this.post('/users/SendTokenRecovery', {email}).toPromise();
  }

  /**
   * Validate the token and user email match to able to change the password.
   * @param email The user email
   * @param token The token
   */
  validateResetPasswordToken(email: string, token: string): Promise<User> {
    return this.post('/users/RecoveryPassword', {email, token}).toPromise();
  }

  /**
   * Change the user password
   * @param email The user email
   * @param token The token
   * @param password The new password
   */
  resetUserPassword(email: string, token: string, password: string): Promise<User> {
    return this.post('/users/ChangePassword', {
      email,
      token,
      Password: password,
      ConfirmPassword: password
    }).toPromise();
  }
}

import { Injectable } from '@angular/core';
import {Person} from '../../../models/person';
import {Company} from '../../../models/company';
import {Institution} from '../../../models/institution';
import {User} from '../../../models/user';
import {HttpService} from '../../../services/http.service';
import {Address} from '../../../models/address';
import {ApiResponse} from '../../../services/api-response';
import {City, Country, ProfitInstitution, State} from '../../../models';
import {environment} from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user.service';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  private userSource = new ReplaySubject<User>();
  public user$ = this.userSource.asObservable();

  /**
   * AuthService
   * @param http http client
   * @param JwtHelperService jwtService
   */
  constructor(
    public jwtHelperService: JwtHelperService,
    protected http: HttpClient,
    private userService: UserService
  ) {
    super(http);
    const user = this.user();
    if (user) {
      this.userSource.next(user);
    }
  }

  /**
   * App login.
   * @param user User to be authenticated.
   */
  login(email: string, password: string, rememberMe = false): Promise<User> {
    return this.post('/auth', {
      email,
      password,
      rememberMe
    }).toPromise().then((response: ApiResponse) => {
      const value: any = response.value;
      this.setToken(value.token);
      console.log(response);
      return this.userService.one(value.idUser).then((user: User) => {
        this.setUser(user);
        return user;
      });
    });
  }

  /**
   * Register a new person in the platform
   * @param person The new user
   */
  signUpPerson(person: Person): Promise<any> {
    const userInfo = {
      ... this.buildPersonInfo(person),
      ... this.buildAddresses(person.address),
      ... this.buildUserSignIn(person),
      ... this.buildBankAccount(person),
      ... this.buildProfilePhoto(person),
      ... this.buildDocuments(person),
    };

    console.log(userInfo);

    return new Promise((resolve, reject) => {

      this.post('/clients', userInfo).subscribe(
        (resp)=>{
          resolve(true);
        },
        (error)=>{
          reject(error);
        }
      )
    });
  }

  /**
   * Register a new person in the platform
   * @param company The new user
   */
  signUpCompany(company: Company): Promise<any> {
    const userInfo = {
      ... this.buildCompanyInfo(company),
      ... this.buildAddresses(company.address),
      ... this.buildUserSignIn(company),
      ... this.buildProfilePhoto(company)
    };

    console.log(userInfo);

    return new Promise((resolve, reject) => {

      this.post('/commerces', userInfo).subscribe(
        (resp)=>{
          resolve(true);
        },
        (error)=>{
          reject(error);
        }
      )
    });

  }

  /**
   * Register a new person in the platform
   * @param institution The new user
   */
  signUpInstitution(institution: Institution): Promise<any> {
    const userInfo = {
      ... this.buildInstitutionInfo(institution),
      ... this.buildAddresses(institution.address),
      ... this.buildUserSignIn(institution),
      ... this.buildProfilePhoto(institution),
    };

    console.log(userInfo);

    return new Promise((resolve, reject) => {

      this.post('/institutions', userInfo).subscribe(
        (resp)=>{
          resolve(true);
        },
        (error)=>{
          reject(error);
        }
      )
    });

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
        tac: false,
        newsLetter: false,
        dni: person.documentNumber,
        CardId: person.documentType.id,
        idOccupation: parseInt(person.occupation.id),
        idInstitution: parseInt(person.profitInstitution.id)
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
        idInstitution: parseInt(company.profitInstitution.id),
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
        idBillingCountry: parseInt(address.country.id),
        idBillingState: parseInt(address.state.id),
        idBillingCity: parseInt(address.city.id)
      },
      address: {
        street: address.street,
        houseNumber: address.houseNumber,
        floor: address.buildingFloor,
        postalCode: address.zipCode,
        idCountry: parseInt(address.country.id),
        idState: parseInt(address.state.id),
        idCity: parseInt(address.city.id)
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

  /**
   * Check whether the token is expired and return true or false
   * @return boolean token is expired.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.localStorage.access_token_var_name);
    try {
      return !this.jwtHelperService.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }

  /**
   * Return the authenticated user from the local storage
   */
  user(): User {
    const localUser = localStorage.getItem(environment.localStorage.user_var_name);

    if (! localUser) {
      return null;
    }

    return new (User)().fromString(localUser);
  }

  /**
   * Reload the data of the authenticated user
   */
  reloadUser(): Promise<User> {
    return this.userService.one(this.user().id).then((user: User) => {
      this.setUser(user);
      return user;
    });
  }

  /**
   * Set the user info in the local storage
   * @param user the user info
   */
  private  setUser(user: User) {
    this.userSource.next( user );
    localStorage.setItem(environment.localStorage.user_var_name, user.toString());
  }

  /**
   * Set the token value in the local storage
   * @param token The token value
   */
  private setToken(token: string) {
    localStorage.setItem(environment.localStorage.access_token_var_name, token);
  }

  buildBankAccount(person: Person): any {
    return {
      bankAccount: null
    };
  }

  buildProfilePhoto(entity: any): any {
    return {
      profilePhoto: null
    };
  }

  buildDocuments(person: Person): any {
    return {
      documents: null
    };
  }

  verifyEmail(params:string): Promise<any>{
    return this.get(`/Email/ConfirmEmail${params}`).toPromise().then(
      (resp:any) =>{
        console.log('resp',resp);
        return true;
      }
    ).catch(
      (error:any) =>{
        console.log('error',error);
        return false;
      }
    );
  }
}

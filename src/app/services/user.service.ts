import { Injectable } from '@angular/core';
import {Address, City, Contact, Country, ProfitInstitution, State, User} from '../models';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {InMemoryService} from './in-memory.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  constructor(
    protected http: HttpClient,
    protected inMemoryService: InMemoryService,
  ) {
    super(http);
  }

  /**
   * Get user by the identifier.
   * @param id identifier
   */
  one(id: number): Promise<User> {
    const resourceUrl = '/users/' + id;

    return this.get(resourceUrl).toPromise().then((response: any)  => {
      const user = new User();
      user.id = response.idUser;
      user.idAspNetUser = response.idAspNetUser;
      user.avatarURL = environment.api.avatarUrl + response.avatarURL;
      user.dateRegistered = response.dateRegistered;
      user.name = response.firstName;
      user.lastName = response.lastName;
      user.fullName = response.fullName;
      user.phone = response.phone;
      user.email = response.email;
      user.idUserType = response.idUserType;
      user.cuit = response.cuit;
      user.documentType = this.inMemoryService.documentTypeByValue(response.dni);
      user.documentNumber = response.cti;
      user.bussinessName = response.socialReason;
      user.profitInstitution = new ProfitInstitution(response.idInstitution);
      user.newsLetter = response.newsLetter;
      user.website = response.institutionWebSite;
      user.employeeQuantity = response.employeeQuantity;
      user.bankAccounts = response.bankAccounts;
      user.annualIncome = response.annualIncome;
      user.instagram = response.instagram;
      user.youtube = response.youtube;
      user.linkedIn = response.linkedIn;
      user.twitter = response.twitter;
      user.facebook = response.facebook;

      if (response.roles) {
        response.roles.map((role: any) => {
          user.addRole(role);
        });
      }

      user.primaryActivityName = response.primaryActivityName;
      user.documents = response.documents;
      user.locals = response.locals;

      const address = new Address();
      address.street = response.street;
      address.houseNumber = response.houseNumber;
      address.buildingFloor = response.floor;
      address.zipCode = response.postalCode;
      address.city = new City(response.idCity);
      address.state = new State(response.idState);
      address.country = new Country(response.idCountry);
      user.address = address;

      const billingAddress = new Address();
      billingAddress.street = response.billingStreet;
      billingAddress.houseNumber = response.billingHouseNumber;
      billingAddress.buildingFloor = response.billingFloor;
      billingAddress.zipCode = response.billingPostalCode;
      billingAddress.city = new City(response.idBillingCity);
      billingAddress.state = new State(response.idBillingState);
      billingAddress.country = new Country(response.idBillingCountry);
      user.billingAddress = billingAddress;

      const contact = new Contact();
      contact.email = response.contactEmail;
      contact.name = response.contactName;
      contact.phone = response.contactPhone;

      user.contact = contact;
      return user;
    });
  }

  /**
   * Get the user by a keyword. Filtered by the user name or user email
   */
  search(keyword: string): Promise<Array<User>> {
    return this.get(`/users/search/${keyword}`)
      .pipe(
        map((users: Array<any>) => users.map(
          (user) => this.castUser(user))
        )
      )
      .toPromise().catch(() => []);
  }

  /**
   * Cast the user response to a User model.
   * @param user from the response
   */
  private castUser(user: any): User {
    const mUser = new User();
    mUser.id = user.idUser;
    mUser.idAspNetUser = user.idAspNetUser;
    mUser.name = user.firstName;
    mUser.lastName = user.lastName;
    mUser.email = user.email;
    mUser.phone = user.phone;
    mUser.avatarURL = environment.api.avatarUrl + user.avatarURL;
    mUser.dateRegistered = user.dateRegistered;
    mUser.fullName = user.fullName;
    mUser.idUserType = user.idUserType;
    return mUser;
  }

  /**
   * Update the user's avatar
   * @param user user object
   * @param data image source in base64
   * @param mimeType image mime-type
   * @param name image name
   */
  public updateAvatar(user: User, data: any, mimeType: string, name: string): Promise<any> {
    return this.put(`/users/update-avatar/${user.id}`, {
      avatar: {
        data,
        mimeType,
        name
      },
      userId: user.id
    },{
      responseType : 'text'
    }).toPromise();
  }

  /**
   * Update the user
   * @param user The user data to update
   */
  public update(user: User): Promise<any> {
    return this.put(`/users/${user.id}`, user.dataForUpdate).toPromise();
  }
}

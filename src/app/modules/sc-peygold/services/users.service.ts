import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Address, City, Country, Institution, Person, ProfitInstitution, State, User, UserStatus} from '../../../models';
import {Contact} from '../../../models/contact';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends HttpService {

  /**
   * Get all users.
   * @param words filter word key
   * @param words filter by user status
   */
  all(words?: string, status?: UserStatus): Promise<Array<User>> {
    let resourceUrl = '/users';

    if (words) {
      resourceUrl = '/users/search/' + words;
    }

    return this.get(resourceUrl)
      .toPromise().then((users: Array<User>) => users.map((user: any) => {
        const nUser = new User();
        nUser.id = user.idUser;
        nUser.idAspNetUser = user.idAspNetUser;
        nUser.avatarURL = user.avatarURL;
        nUser.dateRegistered = user.dateRegistered;
        nUser.name = user.firstName;
        nUser.lastName = user.lastName;
        nUser.fullName = user.fullName;
        nUser.phone = user.phone;
        nUser.email = user.email;
        nUser.idUserType = user.idUserType;
        return nUser;
      })
    );
  }

  /**
   * Get user by the identifier.
   * @param id identifier
   */
  one(id: number): Promise<User> {
    const resourceUrl = '/users/' + id;

    return this.get(resourceUrl).toPromise().then((user: any)  => {
      const nUser = new User();
      nUser.id = user.idUser;
      nUser.idAspNetUser = user.idAspNetUser;
      nUser.avatarURL = user.avatarURL;
      nUser.dateRegistered = user.dateRegistered;
      nUser.name = user.firstName;
      nUser.lastName = user.lastName;
      nUser.fullName = user.fullName;
      nUser.phone = user.phone;
      nUser.email = user.email;
      nUser.idUserType = user.idUserType;
      nUser.cuit = user.cuit;
      nUser.documentType = user.cti;
      nUser.documentNumber = user.dni;
      nUser.documentNumber = user.dni;
      nUser.bussinessName = user.socialReason;
      nUser.profitInstitution = new ProfitInstitution(user.idInstitution);
      nUser.newsLetter = user.newsLetter;
      nUser.website = user.institutionWebSite;
      nUser.employeeQuantity = user.employeeQuantity;
      nUser.bankAccounts = user.bankAccounts;
      nUser.annualIncome = user.annualIncome;
      nUser.instagram = user.instagram;
      nUser.youtube = user.youtube;
      nUser.linkedIn = user.linkedIn;
      nUser.twitter = user.twitter;
      nUser.facebook = user.facebook;
      nUser.roles = user.roles;
      nUser.primaryActivityName = user.primaryActivityName;
      nUser.documents = user.documents;
      nUser.locals = user.locals;

      const address = new Address();
      address.street = user.street;
      address.houseNumber = user.houseNumber;
      address.city = new City(user.idCity, user.cityName);
      address.state = new State(user.idState, user.stateName);
      address.country = new Country(user.idCountry, user.countryName);
      address.zipCode = user.postalCode;
      nUser.address = address;

      const billingAddress = new Address();
      billingAddress.street = user.billingStreet;
      billingAddress.houseNumber = user.billingHouseNumber;
      billingAddress.houseNumber = user.billingFloor;
      billingAddress.city = new City(user.idBillingCity, user.cityName);
      billingAddress.state = new State(user.idBillingState, user.stateName);
      billingAddress.country = new Country(user.idBillingCountry, user.countryName);
      billingAddress.zipCode = user.billingPostalCode;
      nUser.billingAddress = billingAddress;

      const contact = new Contact();
      contact.email = user.contactEmail;
      contact.name = user.contactName;
      contact.phone = user.contactPhone;

      nUser.contact = contact;
      return nUser;
    });
  }
}

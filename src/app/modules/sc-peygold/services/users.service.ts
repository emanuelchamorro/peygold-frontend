import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Address, City, Contact, Country, ProfitInstitution, State, User, UserStatus, DocumentType, Person } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { InMemoryService } from '../../../services';
import { UserService } from '../../../services/user.service';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends UserService {

  constructor(
    protected http: HttpClient,
    protected inMemoryService: InMemoryService,
  ) {
    super(http, inMemoryService);
  }

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
   * Search loans.
   * @return Promise<Array<Transaction>> the list of transaction
   */
  searchAll( word: string, page: number, perPage: number): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    return this.get(`/users/search/${word}/${page}/${perPage}`).toPromise().then(
      (response:any)=>{
        paginator.count = response.recordCount;
        paginator.data = response.userDTOs.map((item:any)=>{
          const nUser = new User();
          nUser.id = item.idUser;
          nUser.idAspNetUser = item.idAspNetUser;
          nUser.avatarURL = item.avatarURL;
          nUser.dateRegistered = item.dateRegistered;
          nUser.name = item.firstName;
          nUser.lastName = item.lastName;
          nUser.fullName = item.fullName;
          nUser.phone = item.phone;
          nUser.email = item.email;
          nUser.idUserType = item.idUserType;
          nUser.active = item.active;
          nUser.cuit = item.cuit;
          nUser.documentNumber = item.dni;
          nUser.systemUserTypeId = item.systemUserTypeId;
          console.log('tipo de usuario', nUser.idUserType)
          return nUser;
        });

        return paginator
      }
    ).catch(
      ()=>{
        return paginator; 
      }
    )

  }


  /**
   * Create a new user.
   * @param user The new user
   */
  store(user: User): Promise<boolean> {
    console.log(user);

    return this.post('/users', user).toPromise();
  }

  /**
   * Edit the user.
   * @param user The user to edit
   */
  update(user: any): Promise<boolean> {
    console.log(user);

    return this.put(`/users/${user.IdUser}`, user).toPromise();
  }

    /**
   * active and inactive
   * @param id is id of the user
   */
  changeActive(id: number,isActive:boolean): Promise<boolean> {
    const params = {
      IdUser: id,
      Active: isActive,
    }
    return this.put(`/users/${id}`, params).toPromise();
  }

  getUserById(id:number):Promise<User>{

    return this.get(`/users/${id}`).toPromise().then(
      (response:any)=>{
        const user = new User();

        console.log(response);
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
        user.documentType = this.inMemoryService.documentTypeByValue(response.cardId?response.cardId:'DNI');
        user.documentNumber = response.dni;
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
        user.systemUserTypeId = response.systemUserTypeId; 
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
        address.city = new City(response.idCity, response.cityName);
        address.state = new State(response.idState, response.stateName);
        address.country = new Country(response.idCountry, response.countryName);
        user.address = address;
  
        const billingAddress = new Address();
        billingAddress.street = response.billingStreet;
        billingAddress.houseNumber = response.billingHouseNumber;
        billingAddress.buildingFloor = response.billingFloor;
        billingAddress.zipCode = response.billingPostalCode;
        billingAddress.city = new City(response.idBillingCity, );
        billingAddress.state = new State(response.idBillingState);
        billingAddress.country = new Country(response.idBillingCountry);
        user.billingAddress = billingAddress;
  
        const contact = new Contact();
        contact.email = response.contactEmail;
        contact.name = response.contactName;
        contact.phone = response.contactPhone;
  
        user.contact = contact;
        return user;
      }
    ).catch(
      (error)=>{
        return null
      }
    )
  }


}

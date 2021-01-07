import { Injectable } from '@angular/core';
import { Address, City, Contact, Country, ProfitInstitution, State, User, Nationality, DocumentType, Company } from '../models';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InMemoryService } from './in-memory.service';

import { PaginationResponse } from '../modules/commons-peygold/entities/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService extends HttpService {

  constructor(
    protected http: HttpClient,
    protected inMemoryService: InMemoryService,
  ) {
    super(http);
  }



    /**
   * Search loans.
   * @return Promise<PaginationResponse>
   */
  searchTemp( word: string, page: number, perPage: number): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    return this.get(`/users/search/${word}/${page}/${perPage}`).toPromise().then(
      (response:any)=>{
        paginator.count = response.recordCount;
        paginator.data = response.userDTOs.map((item:any)=>{

            const nUser = new User();
            nUser.id = item.idUser;
            nUser.idAspNetUser = item.idAspNetUser;
            nUser.avatarURL = environment.api.avatarUrl +  item.avatarURL;
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
        paginator.data = paginator.data.filter(item => item.idUserType==2)
        return paginator
      }
    ).catch(
      ()=>{
        return paginator; 
      }
    )}


    /**
   * Search commerces by category and radio
   * @return Promise<User>
   */
  searchByFilters( params: any): Promise<Array<User>> {
    let commerces = new Array<User>();
    return this.post('/commerces/GetNearestCommerces',params).toPromise().then(
      (response:any)=>{
        commerces = response.map((item:any)=>{
          const nUser = new User();

          nUser.id = item.idUser;
          nUser.latitud = item.latitud;
          nUser.longitud = item.longitud;

          if(item.adress){
            nUser.address = new Address();
            nUser.address.country = new Country(item.adress.idCountry, item.adress.nameCountry);
            nUser.address.state = new State(item.adress.idState, item.adress.nameState);
            nUser.address.city = new City(item.adress.idCity, item.adress.nameCity);
            nUser.address.street = item.adress.street;
            nUser.address.houseNumber = item.adress.houseNumber;
            nUser.address.floor = item.adress.floor;
            nUser.address.zipCode = item.adress.postalCode;
          }

          if(item.userInfo){
            nUser.bussinessName = item.userInfo.socialReason;
            nUser.cuit = item.userInfo.cuit;
            nUser.idAspNetUser = item.userInfo.idAspNetUser;
            nUser.avatarURL = environment.api.avatarUrl +  item.userInfo.avatar;
            nUser.name = item.userInfo.name;

            nUser.phone = item.userInfo.phone;
            nUser.email = item.userInfo.email;
            nUser.idUserType = item.userInfo.idUserType;
          }
          return nUser;
        });
        return commerces;
      }
    ).catch(
      (error)=>{
        return commerces;
      }
    )}


        /**
   * Search commerces by word
   * @return Promise<User>
   */
  searchByWord( word: string, km:number, latitud:number, longitud:number): Promise<Array<User>> {
    let commerces = new Array<User>();
    return this.get(`/commerces/SearchCommerces/${word}/${km}/${latitud}/${longitud}`).toPromise().then(
      (response:any)=>{
        commerces = response.map((item:any)=>{
          const nUser = new User();

          nUser.id = item.idUser;
          nUser.latitud = item.latitud;
          nUser.longitud = item.longitud;

          if(item.adress){
            nUser.address = new Address();
            nUser.address.country = new Country(item.adress.idCountry, item.adress.nameCountry);
            nUser.address.state = new State(item.adress.idState, item.adress.nameState);
            nUser.address.city = new City(item.adress.idCity, item.adress.nameCity);
            nUser.address.street = item.adress.street;
            nUser.address.houseNumber = item.adress.houseNumber;
            nUser.address.floor = item.adress.floor;
            nUser.address.zipCode = item.adress.postalCode;
          }

          if(item.userInfo){
            nUser.bussinessName = item.userInfo.socialReason;
            nUser.cuit = item.userInfo.cuit;
            nUser.idAspNetUser = item.userInfo.idAspNetUser;
            nUser.avatarURL = environment.api.avatarUrl +  item.userInfo.avatar;
            nUser.name = item.userInfo.name;

            nUser.phone = item.userInfo.phone;
            nUser.email = item.userInfo.email;
            nUser.idUserType = item.userInfo.idUserType;
          }
          return nUser;
        });
        return commerces;
      }
    ).catch(
      (error)=>{
        return commerces;
      }
    )}

}

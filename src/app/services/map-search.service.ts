import { Injectable } from '@angular/core';
import { Address, City, Contact, Country, ProfitInstitution, State, User, Nationality, DocumentType, Company } from '../models';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InMemoryService } from './in-memory.service';
import { config } from 'rxjs';
import { IIBBCondition } from '../models/iibb-condition';
import { IvaCondition } from '../models/iva-condition';
import { ServiceCategory } from '../models/service-category';
import { VerifyStatus } from '../models/verify-status';
import { Document } from '../models/document';
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
  search( word: string, page: number, perPage: number): Promise<PaginationResponse> {
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

}

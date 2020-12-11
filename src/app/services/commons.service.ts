import { Injectable } from '@angular/core';
import { Address, City, Contact, Country, ProfitInstitution, State, User, Nationality, DocumentType } from '../models';
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
import { Card } from '../models/card';
import { Status } from '../models/status';
import { CardType } from '../models/card-type';

@Injectable({
  providedIn: 'root'
})
export class CommonsService extends HttpService {

  constructor(
    protected http: HttpClient
  ) {
    super(http);
  }

  getImage(url:string):Promise<string>{
    return this.get(url).toPromise().then(
      (resp)=>{
        return url;
      }
    ).catch(
      (error)=>{
        return null;
      }
    )
  }
}

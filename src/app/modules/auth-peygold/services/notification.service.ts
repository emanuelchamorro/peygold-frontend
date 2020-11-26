import { Injectable } from '@angular/core';
import {Person} from '../../../models/person';
import {Company} from '../../../models/company';
import {Institution} from '../../../models/institution';
import {User} from '../../../models/user';
import {Http1Service} from '../../../services/http.service.1';
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
export class NotificationService extends Http1Service {

  updateSuscription(auth:string, mail:string):Promise<any>{
    return this.put('',{auth:auth, mail:mail}).toPromise().then(
      (resp)=>{
        console.log('resp',resp);
        return resp;
      }
    ).catch(
      (error)=>{
        console.log('error',error);
        return error;
      }
    );
  }

}

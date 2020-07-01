import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {IIBBCondition} from '../models/iibb-condition';

@Injectable({
  providedIn: 'root'
})
export class IibbConditionService extends HttpService{

  public : Array<IIBBCondition>;iibbConditions

  all():Promise<Array<IIBBCondition>>{

    if (this.iibbConditions) {
      return this.resolveWith(this.iibbConditions);
    }

    return this.get('/commons/GetCondicionIIBB').toPromise().then(

      (resp)=>{

        this.iibbConditions = [];
        if(!resp){
          return this.iibbConditions;
        }

        resp.map((item:any)=>{
          this.iibbConditions.push(new IIBBCondition(item.value,item.label));
        })
        return this.iibbConditions;
      }
    ).catch(
      (error)=>{
        return [];
      }
    );

  }
  
}

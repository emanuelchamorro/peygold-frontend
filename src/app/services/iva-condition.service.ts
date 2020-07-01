import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {IvaCondition} from '../models/iva-condition';

@Injectable({
  providedIn: 'root'
})
export class IvaConditionService extends HttpService {

  public ivaConditions:Array<IvaCondition>;

  all():Promise<Array<IvaCondition>>{

    if(this.ivaConditions){
      return this.resolveWith(this.ivaConditions);
    }

    return this.get('/commons/getcondicioniva').toPromise().then(
      (resp)=>{

        this.ivaConditions = [];
        if(!resp){
          return this.ivaConditions;
        }

        resp.map((item:any)=>{
          this.ivaConditions.push(new IvaCondition(item.value, item.label));
        });

        return this.ivaConditions;

      }
    ).catch(
      (resp)=>{
        return [];
      }
    );

  }

}

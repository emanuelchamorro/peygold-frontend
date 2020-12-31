import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { SelectOption } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactsusService extends HttpService {


/**
 * get all subjects
 */
  getSubjects():Promise<Array<SelectOption>>{

    let options = new Array<SelectOption>();
    return this.get('/support/GetSubjects').toPromise().then(
      (resp)=>{
        options = resp.map((item:any)=>{
            let option = new SelectOption(item.idSubject,item.description);
            return option;
        });
        return options;
      }
    ).catch(
      (error)=>{
        return options;
      }
    );

  }

  /**
   * send by email an suggest
   * @param body 
   */
  sendSuggest(body:any){
    return this.post('/support',body).toPromise();
  }


}

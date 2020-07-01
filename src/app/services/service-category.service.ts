import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {ServiceCategory} from '../models/service-category';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService extends HttpService {

  public serviceCategories:Array<ServiceCategory>;

  all():Promise<Array<ServiceCategory>>{

    if(this.serviceCategories){
      return this.resolveWith(this.serviceCategories);
    }

    return this.get('/commons/GetCategoriaComercio').toPromise().then(
      (resp)=>{

        this.serviceCategories = [];
        if(!resp){
          return this.serviceCategories;
        }

        resp.map((item:any)=>{
          this.serviceCategories.push(new ServiceCategory(item.value, item.label))
        });
        return this.serviceCategories;
      }
    ).catch(
      (error)=>{
        return [];
      }
    );

  }

}

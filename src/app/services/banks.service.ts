import { Injectable } from '@angular/core';
import {Bank} from '../models';
import {map} from 'rxjs/operators';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService extends HttpService {

  private banks: Array<Bank>;

  /**
   * Get all banks
   */
  all(): void {
    this.get('/bank')
      .pipe(
        map((banks: Array<any>) => banks.map((item: any) => {
            return new Bank(item.value, item.label);
          })
        )
      ).toPromise().then(
        (resp:any)=> {
          this.banks = resp;          
        }
      ).catch(
        (error:any)=>{
          console.log(error);
        }
      );
  }

  get banksList(){
    return this.banks;
  }
}

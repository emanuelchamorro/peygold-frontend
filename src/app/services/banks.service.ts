import { Injectable } from '@angular/core';
import {Bank} from '../models';
import {map} from 'rxjs/operators';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService extends HttpService {

  public banks: Array<Bank>;

  /**
   * Get all banks
   */
  all(): Promise<Array<Bank>> {
    return this.get('/bank')
      .pipe(
        map((banks: Array<any>) => banks.map((item: any) => {
            return new Bank(item.value, item.label);
          })
        )
      ).toPromise();
  }


  getBanks(): Promise<Bank[]>  {
    if (this.banks) {
      return this.resolveWith(this.banks);
    }

    return this.get('/bank').toPromise().then((response: any) => {
      this.banks = [];

      if (!response) {
        return this.banks;
      }

      response.map((bank: any) => {
        this.banks.push(new Bank(bank.value, bank.label));
      });
      console.log('banks',this.banks);
      return this.banks;
    }).catch(e => {
      return this.banks || [];
    });
  }

  get banksList(){
    return this.banks;
  }
}

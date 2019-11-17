import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Balance} from '../../../models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  /**
   * Get the user balance.
   */
  balances(): Promise<Array<Balance>> {
    return this.get('/balance')
      .pipe(
        map((balances: Array<any>) => balances.map((item: any) => {
            const balance = new Balance();
            balance.amount = item.amount || item.ammount;
            balance.currencyName = item.currencyName;
            balance.pendingAmount = item.pendingAmount || item.pendingAmmount;

            return balance;
          })
        )
      ).toPromise();
  }
}

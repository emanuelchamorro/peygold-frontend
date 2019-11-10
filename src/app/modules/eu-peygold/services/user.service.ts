import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Balance} from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  /**
   * Get the user balance.
   */
  balances(): Promise<Array<Balance>> {
    return this.get('/balance')
      .toPromise().then((balances: Array<any>) => balances.map((balance: any) => {
        const mBalance = new Balance();
        mBalance.amount = balance.amount || balance.ammount;
        mBalance.currencyName = balance.currencyName;
        mBalance.pendingAmount = balance.pendingAmount || balance.pendingAmmount;

        return mBalance;
      })
    );
  }
}

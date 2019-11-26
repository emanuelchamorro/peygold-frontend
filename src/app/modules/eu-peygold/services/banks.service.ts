import { Injectable } from '@angular/core';
import {Bank} from '../../../models';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService extends HttpService {

  /**
   * Get all credit destination
   */
  all(): Promise<Array<Bank>> {
    return this.get('/creditdestinations')
      .pipe(
        map((banks: Array<any>) => banks.map((item: any) => {
            return new Bank(item.value, item.label);
          })
        )
      ).toPromise();
  }
}

import { Injectable } from '@angular/core';
import {CreditDestination} from '../../../models';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CreditDestinationsService extends HttpService {

  /**
   * Get all credit destination
   */
  all(): Promise<Array<CreditDestination>> {
    return this.get('/creditdestinations')
      .pipe(
        map((creditDestinations: Array<any>) => creditDestinations.map((item: any) => {
            return new CreditDestination(item.value, item.label);
          })
        )
      ).toPromise();
  }
}

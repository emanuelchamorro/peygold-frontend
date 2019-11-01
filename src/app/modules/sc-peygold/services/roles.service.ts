import { Injectable } from '@angular/core';
import {Role} from '../../../models';
import {HttpService} from '../../../services/http.service';


@Injectable({
  providedIn: 'root'
})
export class RolesService extends HttpService {

  /**
   * Get all roles
   * @return <Array<Role>>
   */
  all(): Promise<Array<Role>> {
    return this.get('/roles')
      .toPromise().then((roles: Array<any>) => roles.map((role: any) => {
          return new Role(role.normalizedName, role.name);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends BaseService {

  constructor(protected http: HttpClient) {
    super();
  }

  /**
   * Execute the GET request to the PeyGold API.
   * @param url Url context.
   * @param options Request options.
   */
  get(url: string, options?: any): any {
    url = environment.api.url + url;
    return this.http.get(url, options);
  }

  post(url: string, data?: any, options?: any): any {
    url = environment.api.url + url;
    return this.http.post(url, data, options);
  }
}

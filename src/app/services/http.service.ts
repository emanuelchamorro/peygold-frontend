import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';

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
  get(url: string, options?: any): Observable<any> {
    url = environment.api.url + url;
    return this.http.get(url, options);
  }

  /**
   * Execute the POST request to the PeyGold API.
   * @param url Url context.
   * @param data payload.
   * @param options Request options.
   */
  post(url: string, data?: any, options?: any): Observable<any> {
    url = environment.api.url + url;
    return this.http.post(url, data, options);
  }

  /**
   * Execute the PUT request to the PeyGold API.
   * @param url Url context.
   * @param data payload.
   * @param options Request options.
   */
  put(url: string, data?: any, options?: any): Observable<any> {
    url = environment.api.url + url;
    return this.http.put(url, data, options);
  }

  delete(url: string, data?: any):Observable<any>{
    url = environment.api.url + url;
    return this.http.delete(url, data);
  }
}

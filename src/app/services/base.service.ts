import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected http: HttpClient) { }

  get(url: string, options?: any): any {
    url = environment.api.url + url;
    return this.http.get(url, options);
  }
}

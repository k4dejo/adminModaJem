import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Client } from '../models/client';

@Injectable()
export class UserServices {
  public url: string;
  public identity;
  public token;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getClientInfo(idClient: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getClientInfo/' + idClient, {headers: headers});
  }

  /*Traer la lista de favoritos en general de todos los clientes*/

  showFavoriteList(idClient): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getFavoriteList/' + idClient, {headers: headers});
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }
}



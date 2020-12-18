import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  public url: string;

  constructor(public _http: HttpClient) {
      this.url = GLOBAL.url;
  }
  addNewBilling(token, dataBilling): Observable<any> {
    const json = JSON.stringify(dataBilling);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'billing', params, { headers: headers });
  }

  editBilling(token, dataBilling): Observable<any> {
    const json = JSON.stringify(dataBilling);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'editBilling', params, { headers: headers });
  }

  attachProductBilling(token, dataBilling): Observable<any> {
    const json = JSON.stringify(dataBilling);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'attachBillingProduct', params, { headers: headers });
  }


  attachArrayBilling(token, idBilling, dataBilling): Observable<any> {
    const json = JSON.stringify(dataBilling);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'attachArrayBilling/' + idBilling, params, { headers: headers });
  }

  getBilling(idBilling: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getBillingList/' + idBilling, {headers: headers});
  }

  getBillingList(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'billing', {headers: headers});
  }

  detachProductBilling(dataBilling: any): Observable<any> {
    const json = JSON.stringify(dataBilling);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'detachBillingProduct', params, { headers: headers });
  }
}

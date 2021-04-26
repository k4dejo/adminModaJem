import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ReportsellingService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getDataChart(token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.get(this.url + 'getDataChart',{ headers: headers });
  }
}

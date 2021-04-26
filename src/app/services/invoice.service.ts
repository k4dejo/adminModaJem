import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getInvoice(shipping, idApart) {
    let endpoint = this.url + 'getInvoice/' + shipping +'/' + idApart;
    window.open( endpoint, "_blank");
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get<string>(this.url + 'getInvoice/' + shipping + '/' + idApart, { headers, responseType: 'text' as 'json' });
  }
}

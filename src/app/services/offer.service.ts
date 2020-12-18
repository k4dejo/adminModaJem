import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addOffer(token, offer: Offer): Observable<any> {
    const json = JSON.stringify(offer);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'offer', params, { headers: headers });
  }

  getOffer(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'offer', { headers: headers });
  }

  getSingleOffer(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'offer/' + id, { headers: headers });
  }

  getOfferProduct(idProduct): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getOfferProduct/' + idProduct, { headers: headers });
  }

  editOffer(token, id, offer): Observable<any> {
    const json = JSON.stringify(offer);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.put(this.url + 'offer/' + id, params, { headers: headers });
  }

  deleteOffer(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'offer/' + id, { headers: headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Coupon } from '../models/coupon';


@Injectable({
  providedIn: 'root'
})
export class CouponService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  add(token, coupon: Coupon): Observable<any> {
    const json = JSON.stringify(coupon);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'coupon', params, { headers: headers });
  }

  getCoupon(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'coupon', { headers: headers });
  }

  getSingleCoupon(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'coupon/' + id, { headers: headers });
  }

  getCouponClient(coupon): Observable<any> {
    const json = JSON.stringify(coupon);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'getCouponClient', params,  { headers: headers });
  }

  editCoupon(token, id, coupon): Observable<any> {
    const json = JSON.stringify(coupon);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.put(this.url + 'coupon/' + id, params, { headers: headers });
  }

  deleteCoupon(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'coupon/' + id, { headers: headers });
  }
}

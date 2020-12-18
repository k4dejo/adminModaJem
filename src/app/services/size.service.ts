import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Size } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addSize(size: Size): Observable<any> {
        const json = JSON.stringify(size);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'size/CrearTalla', params, {headers: headers});
    }

    attachSizeProduct(attachSizeP): Observable<any> {
        const json = JSON.stringify(attachSizeP);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'size/addTalla', params, {headers: headers});
    }

    updateSizeAmountProduct(token, idProduct, dataPurchase): Observable<any> {
      const json = JSON.stringify(dataPurchase);
      const params = 'json=' + json;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
      return this._http.put(this.url + 'updateSizeAmountProduct/' + idProduct, params, { headers: headers });
    }

    detachSizeProduct(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.delete(this.url + 'deleteTalla/' + id, {headers: headers});
    }

    detachRelation(arrayRelation): Observable<any> {
        const json = JSON.stringify(arrayRelation);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'detachRelation', params, {headers: headers});
    }

    getSizeP(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'getTalla/' + id, {headers: headers});
    }

    getSizesForDepart(gender, department): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'getSizesForDepart/' + gender + '/' + department, {headers: headers});
  }

    getSizeE(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'getTallaEdit/' + id, {headers: headers});
    }
}

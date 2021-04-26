import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ApartService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addNewApart(token, dataApart): Observable<any> {
    const json = JSON.stringify(dataApart);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'AddApart', params, { headers: headers });
  }

  editApart(token, dataPurchase): Observable<any> {
    const json = JSON.stringify(dataPurchase);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'EditApart', params, { headers: headers });
  }

  attachProductApart(token, dataApart): Observable<any> {
    const json = JSON.stringify(dataApart);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'AttachApart', params, { headers: headers });
  }

  dettachProductApart(dataDettachApart: any): Observable<any> {
    const json = JSON.stringify(dataDettachApart);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'detachApart', params, { headers: headers });
  }

  getApart(idApart: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getApart/' + idApart, {headers: headers});
  }

  getOnlyApart(idApart: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getOnlyApart/' + idApart, {headers: headers});
  }

  checkSizeIdApart(idProduct, size): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'checkSizeIdApart/' + idProduct + '/' + size,
     {headers: headers});
  }

  checkAmountProduct(sizeId, idProduct): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'checkAmountProduct/' + sizeId + '/' + idProduct,
    {headers: headers});
  }

  compareAmountSizeProduct(sizeId, idProduct, amountCompare): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'compareAmountSizeProduct/' + sizeId + '/' + idProduct
     + '/' + amountCompare,
    {headers: headers});
  }


  updateAmountApart(token, idProduct, sizeId, isDelete, dataApart): Observable<any> {
    const json = JSON.stringify(dataApart);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.put(this.url + 'ApartChangeAmount/' + idProduct + '/' + sizeId
    + '/' + isDelete, params, { headers: headers });
  }

  cleanApartClient(token, idApart, dataApart): Observable<any> {
    const json = JSON.stringify(dataApart);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.put(this.url + 'cleanApartClient/' + idApart, params, { headers: headers });
  }

  getApartClient(idClient: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getApartClient/' + idClient, {headers: headers});
  }

  getAllApart(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getAllApart', {headers: headers});
  }
}

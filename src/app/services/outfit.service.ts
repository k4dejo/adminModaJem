import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Outfit } from '../models/outfit';


@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addOutfit(token, outfit): Observable<any> {
    const json = JSON.stringify(outfit);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'createOutfit', params, { headers: headers });
  }

  /*getOutfitList(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getOutfitsList', { headers: headers });
  }*/

  getOutfitAttach(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getOutfitAttach/' + id, {headers: headers});
  }

  detachOutfitProduct(arrayRelation): Observable<any> {
    const json = JSON.stringify(arrayRelation);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'deleteOutfitDetach', params, {headers: headers});
  }

  editOutfit(token, dataOutfit, id): Observable<any> {
    const json = JSON.stringify(dataOutfit);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.put(this.url + 'editOutfit/' + id, params, { headers: headers });
  }

  attachOutfitProduct(attachOutfitProduct): Observable<any> {
    const json = JSON.stringify(attachOutfitProduct);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'attachOutfitProduct', params, {headers: headers});
  }

  getAttachOutfit(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getAttachOutfit', { headers: headers });
  }

  deleteOutfit(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'deleteOutfit/' + id, {headers: headers});
  }
}

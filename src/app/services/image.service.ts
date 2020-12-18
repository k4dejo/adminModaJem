import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Image } from '../models/image';

@Injectable()
export class ImageService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  add(token, image: Image): Observable<any> {
    const json = JSON.stringify(image);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'addMimage', params, { headers: headers });
  }

  showImgId(product_id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getImages/' + product_id, { headers: headers });
  }

  deleteImg(img_id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'deleteImg/' + img_id, { headers: headers });
  }

  deleteArrayImg(product_id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'deleteArrayImg/' + product_id, { headers: headers});
  }

  getAllImages(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getListImages', { headers: headers });
  }

  downloadImage(array): Observable<any> {
    const json = JSON.stringify(array);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'downloadImage', params,  { headers: headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { PROVINCE} from './province';

@Injectable()
export class AddresServices {
    public url: string;
    public province_url: string;
    public Can_url: string;
    public Dist_url: string;

    constructor(public _http: HttpClient) {
        this.province_url = PROVINCE.province;
        this.url = GLOBAL.url;
    }

    storeAddress(token, address): Observable<any> {
      const json = JSON.stringify(address);
      const params = 'json=' + json;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
      return this._http.post(this.url + 'storeAddress', params, { headers: headers });
    }

    editAddress(token, dataAddress): Observable<any> {
      const json = JSON.stringify(dataAddress);
      const params = 'json=' + json;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
      return this._http.post(this.url + 'editAddress', params, { headers: headers });
    }

    getAddressPurchase(addressId): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'getAddressPurchase/' + addressId, { headers: headers });
    }

    getProvinceJson(): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.province_url, {headers: headers});
    }

    getCanJson(idCant: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.Can_url = 'https://ubicaciones.paginasweb.cr/provincia/' + idCant + '/cantones.json';
      return this._http.get(this.Can_url, {headers: headers});
    }

    getDistJson(idPro: string, idCant: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.Dist_url = 'https://ubicaciones.paginasweb.cr/provincia/'
      + idPro + '/canton/'
      + idCant + '/distritos.json';
      return this._http.get(this.Dist_url, {headers: headers});
    }

}

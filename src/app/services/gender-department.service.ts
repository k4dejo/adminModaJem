import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Gender } from '../models/gender';
import { Departament } from '../models/department';
import { Dtp } from '../models/Dpt';

@Injectable({
  providedIn: 'root'
})
export class GenderDepartmentService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addGender(token, dataGender: Gender): Observable<any> {
    const json = JSON.stringify(dataGender);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'Genders', params, { headers: headers });
  }

  getAllGender(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'Genders', { headers: headers });
  }

  deleteGender(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'Genders/' + id, { headers: headers });
  }

  showGender(genderId): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'Genders/' + genderId, { headers: headers });
  }

  editGender(token, id, gender): Observable<any> {
    const json = JSON.stringify(gender);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.put(this.url + 'Genders/' + id, params, { headers: headers });
  }

  // =================================SERVICES_DEPARTMENTS======================================

  addDepartment(token, dataDepartment: Dtp): Observable<any> {
    const json = JSON.stringify(dataDepartment);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.post(this.url + 'departments', params, { headers: headers });
  }
  getAllDepartments(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'departments', { headers: headers });
  }

  getDepartmentForGender(idGender: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'getDepartmentForGender/' + idGender, { headers: headers });
  }

  showDepartment(departmentId): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'departments/' + departmentId, { headers: headers });
  }

  deleteDepartment(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'departments/' + id, { headers: headers });
  }

  editDpt(token, id, department): Observable<any> {
    const json = JSON.stringify(department);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this._http.put(this.url + 'departments/' + id, params, { headers: headers });
  }
}

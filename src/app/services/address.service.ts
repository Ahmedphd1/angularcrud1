import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iaddress } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class addressservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  post(newaddress:iaddress):Observable<iaddress>{
    var httpresponse = this.http.post<iaddress>(this.apiurl + "/address", newaddress, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  update(address:iaddress):Observable<iaddress>{
    var httpresponse = this.http.put<iaddress>(this.apiurl + "/address" + "/" + address, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  delete(addressid:number):Observable<iaddress>{
    var httpresponse = this.http.delete<iaddress>(this.apiurl + "/address" + "/" + addressid);
    return httpresponse
  }

  getbyid(addressid:number):Observable<iaddress[]> {
    return this.http.get<iaddress[]>(this.apiurl + "/address" + "/" + addressid);
  }
}

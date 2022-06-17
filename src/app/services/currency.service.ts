import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iaddress, icurrency, idelivery } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class currencyservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  post(newcurrency:icurrency):Observable<icurrency>{
    var httpresponse = this.http.post<icurrency>(this.apiurl + "/currency", newcurrency, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  update(currency:icurrency):Observable<icurrency>{
    var httpresponse = this.http.put<icurrency>(this.apiurl + "/currency" + "/" + currency, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  delete(currencyid:number):Observable<icurrency>{
    var httpresponse = this.http.delete<icurrency>(this.apiurl + "/currency" + "/" + currencyid);
    return httpresponse
  }

  getbyid(currencyid:number):Observable<icurrency> {
    return this.http.get<icurrency>(this.apiurl + "/currency" + "/" + currencyid);
  }
}


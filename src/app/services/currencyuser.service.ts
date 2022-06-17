import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iaddress, icurrencyuser, iorders, iseller, iuser } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class currencyuserservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  getall():Observable<icurrencyuser[]>{
    return this.http.get<icurrencyuser[]>(this.apiurl + '/getallcurrencyuser');
  }

  post(newcurrencyuser:icurrencyuser):Observable<icurrencyuser>{
    var httpresponse = this.http.post<icurrencyuser>(this.apiurl + "/currencyuser", newcurrencyuser, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  update(currencyuser:icurrencyuser):Observable<icurrencyuser>{
    var httpresponse = this.http.put<icurrencyuser>(this.apiurl + "/currencyuser" + "/" + currencyuser, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  delete(currencyuserid:number):Observable<icurrencyuser>{
    var httpresponse = this.http.delete<icurrencyuser>(this.apiurl + "/currencyuser" + "/" + currencyuserid);
    return httpresponse
  }
  gettables(userid:number):Observable<icurrencyuser[]> {
    return this.http.get<icurrencyuser[]>(this.apiurl + "/gettablesbyusercurrency?userid=" + userid);
  }
}

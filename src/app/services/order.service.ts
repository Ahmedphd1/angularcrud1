import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iorders } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class orderservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  getall():Observable<iorders[]>{
    return this.http.get<iorders[]>(this.apiurl + '/getallorders');
  }

  post(neworder:iorders):Observable<iorders>{
    var httpresponse = this.http.post<iorders>(this.apiurl + "/order", neworder, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  update(order:iorders):Observable<iorders>{
    var httpresponse = this.http.put<iorders>(this.apiurl + "/order" + "/" + order, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  delete(orderid:number):Observable<iorders>{
    var httpresponse = this.http.delete<iorders>(this.apiurl + "/order" + "/" + orderid);
    return httpresponse
  }

  getbyid(orderid:number):Observable<iorders[]> {
    return this.http.get<iorders[]>(this.apiurl + "/getorderbyid" + "/" + orderid);
  }

  gettables(orderid:number):Observable<iorders[]> {
    return this.http.get<iorders[]>(this.apiurl + "/gettablesbyuserid" + "/" + orderid);
  }
}

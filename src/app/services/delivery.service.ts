import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iaddress, idelivery } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class deliveryservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  post(newdelivery:idelivery):Observable<idelivery>{
    var httpresponse = this.http.post<idelivery>(this.apiurl + "/delivery", newdelivery, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  update(delivery:idelivery):Observable<idelivery>{
    var httpresponse = this.http.put<idelivery>(this.apiurl + "/delivery" + "/" + delivery, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  getall():Observable<idelivery[]>{
    return this.http.get<idelivery[]>(this.apiurl + '/getalldeliveries');
  }

  delete(deliveryid:number):Observable<idelivery>{
    var httpresponse = this.http.delete<idelivery>(this.apiurl + "/delivery" + "/" + deliveryid);
    return httpresponse
  }

  getbyid(deliveryid:number):Observable<idelivery> {
    return this.http.get<idelivery>(this.apiurl + "/delivery" + "/" + deliveryid);
  }
}


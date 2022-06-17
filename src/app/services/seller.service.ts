import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iorders, iseller } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class sellerservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  getall():Observable<iseller[]>{
    return this.http.get<iseller[]>(this.apiurl + '/getallsellers');
  }

  update(seller:iseller):Observable<iseller>{
    var httpresponse = this.http.put<iseller>(this.apiurl + "/seller", seller, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  post(newseller:iseller):Observable<iseller>{
    var httpresponse = this.http.post<iseller>(this.apiurl + "/seller", newseller, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  delete(sellerid:number):Observable<iseller>{
    var httpresponse = this.http.delete<iseller>(this.apiurl + "/seller" + "/" + sellerid);
    return httpresponse
  }

  getbyid(sellerid:number):Observable<iseller[]> {
    return this.http.get<iseller[]>(this.apiurl + "/getsellerbyid?sellerid=" + sellerid);
  }

  gettables(sellerid:number):Observable<iseller[]> {
    return this.http.get<iseller[]>(this.apiurl + "/gettablesbyseller?sellerid=" + sellerid);
  }
}

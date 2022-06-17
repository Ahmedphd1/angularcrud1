import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iaddress, iorders, iseller, iuser } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class userservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  getall():Observable<iuser[]>{
    return this.http.get<iuser[]>(this.apiurl + '/getallusers');
  }

  post(newuser:iuser):Observable<iuser>{
    var httpresponse = this.http.post<iuser>(this.apiurl + "/user", newuser, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  getbyname(username:string):Observable<iuser> {
    console.log()
    return this.http.get<iuser>(this.apiurl + "/getuserbyname?username=" + username);
  }

  update(user:iuser):Observable<iuser>{
    var httpresponse = this.http.put<iuser>(this.apiurl + "/user", user, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  delete(userid:number):Observable<iuser>{
    var httpresponse = this.http.delete<iuser>(this.apiurl + "/user" + "/" + userid);
    return httpresponse
  }
  gettables(userid:number):Observable<iuser[]> {
    return this.http.get<iuser[]>(this.apiurl + "/gettablesbyuser?userid=" + userid);
  }
}

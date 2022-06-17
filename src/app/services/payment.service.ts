import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iaddress, ipayment } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class paymentservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  post(newpayment:ipayment):Observable<ipayment>{
    var httpresponse = this.http.post<ipayment>(this.apiurl + "/payment", newpayment, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  getall():Observable<ipayment[]>{
    return this.http.get<ipayment[]>(this.apiurl + '/getallpayments');
  }

  update(payment:ipayment):Observable<ipayment>{
    var httpresponse = this.http.put<ipayment>(this.apiurl + "/payment" + "/" + payment, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }


  delete(paymentid:number):Observable<ipayment>{
    var httpresponse = this.http.delete<ipayment>(this.apiurl + "/payment" + "/" + paymentid);
    return httpresponse
  }

  getbyid(paymentid:number):Observable<ipayment[]> {
    return this.http.get<ipayment[]>(this.apiurl + "/address" + "/" + paymentid);
  }
}

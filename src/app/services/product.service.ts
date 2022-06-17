import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { iaddress, iproduct } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class productservice {

  constructor(private http:HttpClient) { }

  apiurl : string = "https://localhost:44329/api";

  getall():Observable<iproduct[]>{
    return this.http.get<iproduct[]>(this.apiurl + '/getallproducts');
  }

  post(newproduct:iproduct):Observable<iproduct>{
    var httpresponse = this.http.post<iproduct>(this.apiurl + "/product", newproduct, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  update(product:iproduct):Observable<iproduct>{
    var httpresponse = this.http.put<iproduct>(this.apiurl + "/product", product, {headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })})
    return httpresponse
  }

  delete(productid:number):Observable<iproduct>{
    var httpresponse = this.http.delete<iproduct>(this.apiurl + "/product" + "/" + productid);
    return httpresponse
  }

  getbyid(addressid:number):Observable<iproduct[]> {
    return this.http.get<iproduct[]>(this.apiurl + "/product" + "/" + addressid);
  }
}

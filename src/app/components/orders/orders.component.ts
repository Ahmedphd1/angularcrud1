import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { iorders } from 'src/app/interface/interfaces';
import { orderservice } from 'src/app/services/order.service';
import { productservice } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  title = "orders";
  list : iorders[] = [];
  order : iorders = {} as iorders;
  orderbyid : iorders[] = [];

  orderform = new FormGroup({
    orderid: new FormControl(''),
    productid: new FormControl(''),
    userid: new FormControl(''),
    deliveryid: new FormControl(''),
    paymentid: new FormControl(''),
  });

  constructor(private webapi:orderservice) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.order = {orderid : 0,
                  productid : Number(this.orderform.controls["productid"].value),
                  userid : Number(this.orderform.controls["userid"].value),
                  deliveryid : Number(this.orderform.controls["deliveryid"].value),
                  paymentid : Number(this.orderform.controls["paymentid"].value)}
  }

  vieworders() {
    this.webapi.getall().subscribe((allorders)=>{
      this.list = allorders;
     })
  }

  deleteorder(orderid:number){
    this.webapi.delete(orderid).subscribe();
  }

  getorderbyid(orderid: string) {
    this.orderbyid = []
    this.webapi.gettables(Number(orderid)).subscribe((order) => {
      this.orderbyid.push(order[0])
    });
  }

  createorder(orderobject : iorders){
    
    this.webapi.post(orderobject).subscribe(createdorder =>{
      alert(createdorder)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { iseller, iorders, idelivery, ipayment, iuser } from 'src/app/interface/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { sellerservice } from 'src/app/services/seller.service';
import { orderservice } from 'src/app/services/order.service';
import { deliveryservice } from 'src/app/services/delivery.service';
import { paymentservice } from 'src/app/services/payment.service';
import { userservice } from 'src/app/services/user.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  title = "seller details";
  list : iseller[] = [];
  seller : iseller = {} as iseller;
  sellerbyid : iseller[] = [];
  deliverylist : idelivery[] = [];
  paymentlist : ipayment[] = [];
  selectedproduct : number = 0;
  selectedpayment : number = 0;
  selecteddelivery : number = 0;
  sellerid : number = 0;
  order : iorders = {} as iorders;

  sellerform = new FormGroup({
    sellerid: new FormControl(''),
    name: new FormControl(''),
    productid: new FormControl('')
  });



  constructor(private userservice:userservice, private webapi:sellerservice, private orderservice:orderservice, private deliveryservice:deliveryservice, private paymentservice:paymentservice) { }

  ngOnInit(): void {
    this.webapi.getall().subscribe(deliveries =>{
      this.list = deliveries
    })

    this.deliveryservice.getall().subscribe(deliveries =>{
      this.deliverylist = deliveries
    })

    this.paymentservice.getall().subscribe(payments =>{
      this.paymentlist = payments
    })
  }

  onSubmit(): void {
    this.seller = {
      sellerid : 0,
      name : this.sellerform.controls["name"].value,
      productid : Number(this.sellerform.controls["productid"].value)
      }

    this.createseller(this.seller)
  }

  update() {
    this.seller = {
      sellerid : this.sellerform.controls["sellerid"].value,
      name : this.sellerform.controls["name"].value,
      productid : Number(this.sellerform.controls["productid"].value)
      }

      this.webapi.update(this.seller).subscribe(updatedseller => {
        alert("seller updated")
      })
  }

  onselect(productid:number, sellerid:number) {
    this.selectedproduct = productid;
    this.sellerid = sellerid;
  }

  viewseller() {
    this.webapi.getall().subscribe((allsellers)=>{
      console.log(allsellers)
      this.list = allsellers;
     })
  }

  getsellerbyid(sellerid: string) {
    this.sellerbyid = []
    this.webapi.gettables(Number(sellerid)).subscribe((seller) => {
      console.log(sellerid)
      console.log(seller)
      this.sellerbyid.push(seller[0])
    });
  }

  createseller(sellerobject : iseller){
    
    this.webapi.post(sellerobject).subscribe(createdseller =>{
      alert(createdseller)
    })
  }

  onbuy() {

    var username = localStorage.getItem("user") as string

    if (username != null) {

      this.userservice.getbyname(localStorage.getItem("user") as string).subscribe((user) => {

        this.order = { orderid : 0,
          productid : Number(this.selectedproduct),
          userid : user.userid,
          deliveryid : Number(this.selecteddelivery),
          paymentid : Number(this.selectedpayment)
    }
  
    this.webapi.delete(this.sellerid).subscribe();
    
      this.orderservice.post(this.order).subscribe(createdproduct =>{
        alert("Order created")
      })
      });

    } else {
      alert("Please login to purchase")
    }
  }

}

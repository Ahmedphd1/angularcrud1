import { Component, OnInit } from '@angular/core';
import { idelivery, ikurv, iorders, ipayment, iproduct } from 'src/app/interface/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { productservice } from 'src/app/services/product.service';
import { deliveryservice } from 'src/app/services/delivery.service';
import { paymentservice } from 'src/app/services/payment.service';
import { orderservice } from 'src/app/services/order.service';
import { userservice } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title = "product details";
  list : iproduct[] = [];
  product : iproduct = {} as iproduct;
  kurvitem : ikurv = {} as ikurv;
  order : iorders = {} as iorders;
  productbyid : iproduct[] = [];
  deliverylist : idelivery[] = [];
  paymentlist : ipayment[] = [];
  selecteddelivery : number = 0;
  selectedpayment : number = 0;
  kurv : ikurv[] = [];
  fredag : string = "fredag";

  productform = new FormGroup({
    productid: new FormControl(''),
    productname: new FormControl(''),
    price: new FormControl('')
  });

  constructor(private userservice:userservice, private webapi:productservice, private deliveryservice:deliveryservice, private paymentservice:paymentservice, private orderservice:orderservice) { }

  ngOnInit(): void {
    this.getproducts();

    this.deliveryservice.getall().subscribe(deliveries =>{
      this.deliverylist = deliveries
    })

    this.paymentservice.getall().subscribe(payments =>{
      this.paymentlist = payments
    })

    if (localStorage.getItem("kurv") != null) {
      this.kurv = JSON.parse(localStorage.getItem("kurv") as string);
    } else {
      localStorage.setItem("kurv", JSON.stringify(this.kurv))
    }
  }

  onSubmit(): void {
    this.product = { productid : 0,
      productname : this.productform.controls["productname"].value,
      price : Number(this.productform.controls["price"].value)
  }

  this.postproduct(this.product)
}

update() {
  this.product = { productid : this.productform.controls["productid"].value,
    productname : this.productform.controls["productname"].value,
    price : Number(this.productform.controls["price"].value)
}

    this.webapi.update(this.product).subscribe(updatedproduct => {
      alert("product updated")
    })
}

postproduct(productobject : iproduct){
    
  this.webapi.post(productobject).subscribe(createdproduct =>{
    alert(createdproduct)
  })
}

deleteproduct(productid:string){
  this.webapi.delete(Number(productid)).subscribe();
}


getproducts() {
  this.webapi.getall().subscribe((allproducts)=>{
    this.list = allproducts;
   })
}

onbuy() {
  console.log(this.selecteddelivery)
  console.log(this.selectedpayment)
  console.log(this.product.productid)

  var username = localStorage.getItem("user") as string

  if (username != null) {

    this.userservice.getbyname(username).subscribe((user) => {

      this.order = { orderid : 0,
        productid : Number(this.product.productid),
        userid : user.userid,
        deliveryid : Number(this.selecteddelivery),
        paymentid : Number(this.selectedpayment)
    }
    
      this.orderservice.post(this.order).subscribe(createdproduct =>{
        alert("Order created")

        this.kurvitem = {productname : this.product.productname,
          price: this.product.price,
          quantity : 1}

        this.kurv.push(this.kurvitem)

      })

    })

  } else {
    alert("Please login to purchase")
  }

}

deletekurv() {
  this.kurv = []
}


deletebyid(index : string) {
  this.fredag = index;
}

onselect(product:iproduct) {
  this.product = product;
}

}

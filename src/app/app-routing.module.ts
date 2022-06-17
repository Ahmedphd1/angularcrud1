import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SellersComponent } from './components/sellers/sellers.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'product', component: ProductsComponent }, 
  { path: 'orders', component: OrdersComponent }, 
  { path: 'sellers', component: SellersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

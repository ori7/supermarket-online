import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CartService } from 'src/app/services/cart.service';
import { cartModel } from 'src/app/models/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: string;
  user: UserModel;
  token: string;
  name: string;
  shoppingButtton: string;
  cart: cartModel;
  ViewCart: boolean;
  welcome: string;
  currentPrice: number;

  constructor(private loginService: LoginService,
    private router: Router,
    private cartService: CartService) {

    this.user = <UserModel>{};
    this.shoppingButtton = 'Start shoping';
  }

  ngOnInit() {

    this.loginService.dstails.next([]);  //  If the user returns to the 'login' page, clears user details to hide the 'shoping' nav.
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userComeBack(this.token);
    }
    this.ViewCart = true;
  }

  login() {

    this.loginService.login(this.user).subscribe(res => {
      if (res) {
        this.saveUser(res);
        this.loginError = "";
        if ((res['role']) === 1) {
          this.loginAdmin();
        }
        else
          this.checkUser(res['id']);
      } else {
        this.user.email = this.user.password = '';
        this.loginError = "Error with login!";
      }
    });
  }

  loginAdmin() {

    sessionStorage.setItem('role', '1');
    this.loginService.dstails.next([this.name, 'admin']);
    this.router.navigate(['/admin']);
  }

  saveUser(user) {

    sessionStorage.setItem('name', user.user);
    this.name = user.user;
    this.user.id = user.id;
  }

  userComeBack(token) {

    const decode = jwt_decode(token);
    if (decode.role) {      //    This is admin. He need to login again!
      this.router.navigate(['/logOut']);
    }
    else {     //    This is user. He can continue!
      this.saveUser(decode);
      this.checkUser(decode.id);
    }
  }

  checkUser(userId) {

    this.cartService.getCarts(userId).subscribe(res => { 
      if (Array.isArray(res)) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].status === 'open') {
            this.cartService.getProducts(res[i]._id).subscribe(resProducts => {
              if (Array.isArray(resProducts)) {
                if (resProducts.length > 0) {
                  this.currentPrice = this.getCurrentPrice(resProducts);
                  this.cart = res[i];
                  this.shoppingButtton = 'Resume shoping';
                }
              }
            })
          }
        }
      }
      else
        this.welcome = 'Welcome to your first shoping!'
    });
  }

  getCurrentPrice(products) {

    let price = 0;
    for (let i = 0; i < products.length; i++) {
      price += products[i].price * products[i].quantity;
    }
    return price;
  }

  goShoping() {

    this.loginService.dstails.next([this.name]);
    this.router.navigate(['/shoping', this.user.id]);
  }
}

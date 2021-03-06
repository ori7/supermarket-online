import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/models/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: string;
  user: UserModel;
  token: string;
  shoppingButtton: string;
  cart: CartModel;
  currentPrice: number;

  constructor(private loginService: LoginService,
    private router: Router,
    private cartService: CartService) {

    this.user = <UserModel>{};
    this.cart = <CartModel>{};
    this.shoppingButtton = 'Start shoping';
  }

  ngOnInit() {

    this.loginService.details.next([]);  //  If the user returns to the 'login' page, clears user details to hide the 'shoping' nav.
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userComeBack(this.token);
    }
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
      }
      else {
        this.user.email = this.user.password = '';
        this.loginError = "Error with login!";
      }
    });
  }

  loginAdmin() {

    sessionStorage.setItem('role', '1');
    this.loginService.details.next([this.user.name, 'admin']);
    this.router.navigate(['/admin']);
  }

  saveUser(user) {

    sessionStorage.setItem('name', user.user);
    this.user.name = user.user;
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

    /*
    First, check if the user has an active shopping cart with products.
    If not, bring the latest shopping cart (ordered).
    Otherwise, this is a first purchase, Welcome!
    */
    this.cartService.getCart(userId, 'open').subscribe(
      res => {
        this.cartService.getProducts(res._id).subscribe(resProducts => {
          if (resProducts.length > 0) {
            this.currentPrice = this.getCurrentPrice(resProducts);
            this.cart = res;
            this.shoppingButtton = 'Resume shoping';
          }
          else
            this.getCloseCart(userId);
        })
      },
      error => {
        this.getCloseCart(userId);
      }
    )
  }

  getCloseCart(userId) {

    this.cartService.getCart(userId, 'close').subscribe(res => {
      if (res)
        this.cart = res;
      else
        this.cart = null;
    })
  }

  getCurrentPrice(products) {

    let price = 0;
    for (let i = 0; i < products.length; i++) {
      price += products[i].price;
    }
    return price;
  }

  goShoping() {

    this.loginService.details.next([this.user.name]);
    this.router.navigate(['/shoping', this.user.id]);
  }
}
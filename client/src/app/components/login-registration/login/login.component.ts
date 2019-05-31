import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

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

  constructor(private loginService: LoginService,
    private router: Router) {

    this.user = <UserModel>{};
    this.shoppingButtton = 'Start shoping';
  }

  ngOnInit() {

    this.loginService.dstails.next([]);  //  If the user returns to the 'login' page, clears user details to hide the 'shoping' nav.
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userComeBack(this.token);
    }
  }

  login() {

    this.loginService.login(this.user).subscribe(res => {
      if (res) {
        this.saveUser(res['user']);
        if ((res['role']) === 1) {
          this.loginAdmin();
        }
        this.loginError = "";
        this.checkStatus(res);
      } else {
        this.user.email = this.user.password = '';
        this.loginError = "Error with login!";
      }
    });
  }

  loginAdmin() {

    sessionStorage.setItem('role', '1');
    this.loginService.dstails.next([this.name,'admin']);
    this.router.navigate(['/admin']);
  }

  saveUser(name) {

    sessionStorage.setItem('name', name);
    this.name = name;
  }

  userComeBack(token) {

    const decode = jwt_decode(token);
    if (decode.role) {      //    This is admin. He need to login again!
      this.router.navigate(['/logOut']);
    }
    else {     //    This is user. He can continue!
      this.saveUser(decode.user);
      this.checkStatus(decode);
    }
  }

  checkStatus(user) {

    this.loginService.checkCart(user).subscribe(res => {
      if (res) {
        this.shoppingButtton = 'Resume shoping';
      }
    });
  }

  goShoping() {

    this.loginService.dstails.next([this.name]);
    this.router.navigate(['/shoping']);
  }
}

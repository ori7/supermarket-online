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
  continueShopping: boolean;

  constructor(private loginService: LoginService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) {

    this.user = <UserModel>{};
  }

  ngOnInit() {

    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userComeBack(this.token);
    }
  }

  login() {

    this.loginService.login(this.user).subscribe(res => {
      if (res) {
        console.log(res);
        this.saveName(res['user']);
        this.loginError = "";
        this.checkStatus(res);
      } else {
        this.user.email = this.user.password = '';
        this.loginError = "Error with login!";
      }
    });
  }

  saveName(name) {

    sessionStorage.setItem('user', name);
    this.name = name; console.log(this.name);
  }

  userComeBack(token) {

    const decode = jwt_decode(token);
    this.saveName(decode.user);
    this.checkStatus(decode);
  }

  checkStatus(user) {

    this.loginService.checkCart(user).subscribe(res => {
      if (res) {
        this.changeDetectorRef.detectChanges();
        document.getElementById("start").innerHTML = 'Resume shoping';
      }
    });
  }

  goShoping() {

    this.router.navigate(['/shoping']);
  }
}

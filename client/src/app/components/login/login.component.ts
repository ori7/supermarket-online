import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: string;
  user: User;

  constructor(private loginService: LoginService,
    private router: Router) {

    this.user = <User>{};
  }

  ngOnInit() {
  }

  login() {

    this.loginService.login(this.user).subscribe(res => {
      if (res) {
        this.checkStatus(res);
      } else {
        this.user.email = this.user.password = '';
        this.loginError = "Error with login!";
      }
    })
  }

  checkStatus(user) {

    this.loginService.checkCart(user).subscribe(res => {
      if (res) {
        document.getElementById("start").innerHTML = 'Resume shoping';
      }
      document.getElementById("start").removeAttribute("disabled");
    })
  }

}

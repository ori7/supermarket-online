import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    localStorage.removeItem('token');
    this.loginService.isLogged.next(false);
    this.router.navigate(['/login']);
  }

}

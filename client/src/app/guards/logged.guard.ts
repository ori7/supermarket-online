import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  logged: boolean;
  constructor(private loginService: LoginService,
    private router: Router) {
    this.logged = false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loginService.isLogged.subscribe(res => {
      this.logged = res;
    });
    if (!this.logged) {
      this.router.navigate(['login']);
    }
    return this.logged;
  }
}

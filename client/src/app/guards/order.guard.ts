import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const decode = jwt_decode(token);
      if (next.url[next.url.length - 2].path == decode.id) {   //   Checks that the 'user id' inside the 'token' matches the parameter passed in the url
        return true;
      }
      else {
        this.router.navigate(['logOut']);
      }
    }
    else {
      this.router.navigate(['logOut']);
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserModel } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ENDPOINTS = {
    login: "login",
    carts: "carts"
  };
  isLogged: BehaviorSubject<boolean>;
  details: BehaviorSubject<string[]>;

  constructor(private httpClient: HttpClient) {

    this.isLogged = new BehaviorSubject<boolean>(this.getToken() != null);
    this.details = new BehaviorSubject<string[]>([]);
  }

  login(user: UserModel): Observable<object> {

    return this.httpClient.post<string>(environment.serverUrl + this.ENDPOINTS.login, user).pipe(
      catchError(errorRes => {
        this.isLogged.next(false);
        return of(undefined);
      }),
      map(tokenRes => {
        if (tokenRes) {
          window.localStorage.setItem('token', tokenRes);
          this.isLogged.next(true);
          const decode = jwt_decode(tokenRes);
          return decode;
        }
      })
    );
  }

  getToken() {

    return localStorage.getItem('token');
  }

}
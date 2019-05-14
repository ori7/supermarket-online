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

  ENDPOINT = {
    login: "login",
    carts: "carts"
  };
  isLogged: BehaviorSubject<boolean>;
  token = '47v62b7468o765v87';

  constructor(private httpClient: HttpClient) {

    this.isLogged = new BehaviorSubject<boolean>(this.getToken() != null);
  }

  login(user: UserModel): Observable<object> {

    return this.httpClient.post<string>(environment.serverUrl + this.ENDPOINT.login, user).pipe(
      catchError(errorRes => {
        this.isLogged.next(false);
        return of(undefined);
      }),
      map(tokenRes => {
        if (tokenRes) {
          window.localStorage.setItem('token', tokenRes);
          //sessionStorage.setItem('token', tokenRes);
          this.isLogged.next(true);
          const decode = jwt_decode(tokenRes);
          console.log(decode);
          return decode;
        }
      })
    );
  }

  getToken() {

    return localStorage.getItem('token');
  }

  checkCart(user): Observable<boolean> {
    return of(false);

    return this.httpClient.post<number>(environment.serverUrl + this.ENDPOINT.carts, user).pipe(
      map(res => {
        if (res > 0)
          return true;
        else
          return false;
      })
    )
  }

}
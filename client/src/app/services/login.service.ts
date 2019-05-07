import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ENDPOINT = {
    login: "login",
    carts: "carts"
  };
  //isLoged: BehaviorSubject<boolean>;
  token = '47v62b7468o765v87';

  constructor(private httpClient: HttpClient) {

    //this.isLoged = new BehaviorSubject<boolean>(this.getToken() != null);
  }

  login(user: User): Observable<object> {

    //return this.httpClient.post(environment.serverUrl + this.ENDPOINT.login, user).pipe(

    return of(this.token).pipe(
      catchError(errorRes => {
        //this.isLoged.next(false);
        return of(undefined);
      }),
      map(tokenRes => {
        if (tokenRes) {
          window.localStorage.setItem('token', tokenRes);
          sessionStorage.setItem('token', tokenRes);
          //this.isLoged.next(true);
          return tokenRes;
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
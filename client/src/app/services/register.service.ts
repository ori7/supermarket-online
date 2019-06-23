import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  newUser: BehaviorSubject<UserModel>;

  ENDPOINT = {
    register: "register",
    email: "/email",
    id: "/id"
    //carts: "carts"
  };

  constructor(private httpClient: HttpClient,
    private loginService: LoginService) {

    this.newUser = new BehaviorSubject<UserModel>(null);
  }

  getCities(): object {

    return { 1: 'Jerusalem', 2: 'Tel aviv', 3: 'haifa' };
  }

  createUser1(details) {

    /*
    this.newUser = <UserModel>{};
    this.newUser.id = details.id;
    this.newUser.email = details.email;
    this.newUser.password = details.password;console.log(this.newUser);
    */
    var user = <UserModel>{};
    user.id = details.id;
    user.email = details.email;
    user.password = details.password;
    this.newUser.next(user);console.log(this.newUser);
  }

  createUser2(details) {

    /*
    this.newUser.city = details.city;
    this.newUser.street = details.street;
    this.newUser.name = details.name;
    this.newUser.lastName = details.lastName;
    */
    var user = this.newUser.getValue();
    user.city = details.city;
    user.street = details.street;
    user.name = details.name;
    user.lastName = details.lastName;
    this.newUser.next(user);console.log(this.newUser);
  }

  saveUser(): Observable<object> {

    return this.httpClient.post<string>(environment.serverUrl + this.ENDPOINT.register, this.newUser.getValue()).pipe(
      map(tokenRes => {
        if (tokenRes) {
          window.localStorage.setItem('token', tokenRes);
          //sessionStorage.setItem('token', tokenRes);
          this.loginService.isLogged.next(true);
          const decode = jwt_decode(tokenRes);
          return decode;
        }
      })
    );
  }

  checkEmail(email: object): Observable<boolean> {

    return this.httpClient.post<boolean>(environment.serverUrl + this.ENDPOINT.register + this.ENDPOINT.email, email);
  }

  checkId(id: object): Observable<boolean> {

    return this.httpClient.post<boolean>(environment.serverUrl + this.ENDPOINT.register + this.ENDPOINT.id, id);
  }

}
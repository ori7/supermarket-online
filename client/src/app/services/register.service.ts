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
    register: "register/",
    email: "email",
    id: "id"
  };

  constructor(private httpClient: HttpClient,
    private loginService: LoginService) {

    this.newUser = new BehaviorSubject<UserModel>(null);
  }

  getCities(): object {

    //   TODO: Get list of cities from api.
    return { 1: 'Jerusalem', 2: 'Tel aviv', 3: 'Haifa', 4: 'Rishon Lezion', 5: 'Eilat' };
  }

  createUser1(details) {

    var user = <UserModel>{};
    user.id = details.id;
    user.email = details.email;
    user.password = details.password;
    this.newUser.next(user);
  }

  createUser2(details) {

    var user = this.newUser.getValue();
    user.city = details.city;
    user.street = details.street;
    user.name = details.name;
    user.lastName = details.lastName;
    this.newUser.next(user);
  }

  saveUser(): Observable<object> {

    return this.httpClient.post<string>(environment.serverUrl + this.ENDPOINT.register, this.newUser.getValue()).pipe(
      map(tokenRes => {
        if (tokenRes) {
          window.localStorage.setItem('token', tokenRes);
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
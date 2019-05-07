import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  newUser: User;

  ENDPOINT = {
    login: "login",
    carts: "carts"
  };

  constructor(private httpClient: HttpClient) {

  }

  checkId(id: number): Observable<boolean> {

    return of(false);

    return this.httpClient.post<boolean>(environment.serverUrl + this.ENDPOINT.login, id);
  }

  getCities(): object {

    return {1:'Jerusalem', 2:'Tel aviv', 3:'haifa'};
  }

  createUser1(details) {

    this.newUser = <User>{};
    this.newUser.id = details.id;
    this.newUser.email = details.email;
    this.newUser.password = details.password;
    console.log(this.newUser);
  }

  createUser2(details) {

    this.newUser.city = details.city;
    this.newUser.street = details.street;
    this.newUser.name = details.name;
    this.newUser.lastName = details.lastName;
    console.log(this.newUser);
  }

  saveUser(): Observable<object>{

    return of(this.newUser);
  }

}
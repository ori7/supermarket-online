import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ENDPOINTS = {
    order: "order/",
    user: "user/"
  };
  mark: BehaviorSubject<string>;

  constructor(private httpClient: HttpClient) { 

    this.mark = new BehaviorSubject<string>(null);
  }

  getUser(id: number): Observable<UserModel> {

    return this.httpClient.get<UserModel>(environment.serverUrl + this.ENDPOINTS.order + this.ENDPOINTS.user + id);
  }
}

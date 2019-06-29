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
    user: "user/",
    price: "price/"
  };
  mark: BehaviorSubject<string>;

  constructor(private httpClient: HttpClient) { 

    this.mark = new BehaviorSubject<string>(null);
  }

  getUser(id: number): Observable<UserModel> {

    return this.httpClient.get<UserModel>(environment.serverUrl + this.ENDPOINTS.order + this.ENDPOINTS.user + id);
  }

  getTotalPrice(cartId: number): Observable<number> {

    return this.httpClient.get<number>(environment.serverUrl + this.ENDPOINTS.order + this.ENDPOINTS.price + cartId);
  }

  makeOrder(userId: number, cartId: number): Observable<boolean> {

    return this.httpClient.get<boolean>(environment.serverUrl + this.ENDPOINTS.order + userId + '/' + cartId);
  }
}

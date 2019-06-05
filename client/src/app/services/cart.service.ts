import { Injectable } from '@angular/core';
import { cartModel } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentCart: BehaviorSubject<cartModel>
  ENDPOINTS = {
    cart: "cart/",
    cartItem: "cartItem/"
  }

  constructor(private httpClient: HttpClient) { 

    this.currentCart = new BehaviorSubject<cartModel>(null);
  }

  getCart(id: number): Observable<cartModel> {

    return this.httpClient.get<cartModel>(environment.serverUrl + this.ENDPOINTS.cart + id);
  }

  deleteItem(cartId: number, itemId: number): Observable<object> {

    return this.httpClient.delete<object>(environment.serverUrl + this.ENDPOINTS.cart + this.ENDPOINTS.cartItem + cartId + '/' + itemId);
  }
}

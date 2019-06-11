import { Injectable } from '@angular/core';
import { cartModel } from '../models/cart';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { productCartModel } from '../models/productCart';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart: BehaviorSubject<productCartModel[]>
  ENDPOINTS = {
    cart: "cart/",
    cartItem: "cartItem/",
    cartItems: "cartItems/"
  }

  constructor(private httpClient: HttpClient) { 

    this.productsInCart = new BehaviorSubject<productCartModel[]>(null);
  }

  getCart(id: number): Observable<cartModel> {

    return this.httpClient.get<cartModel>(environment.serverUrl + this.ENDPOINTS.cart + id);
  }

  getProducts(id: number): Observable<productCartModel[]> {console.log(id);

    return this.httpClient.get<productCartModel[]>(environment.serverUrl + this.ENDPOINTS.cart + this.ENDPOINTS.cartItems + id);
  }

  deleteItem(cartId: number, itemId: number): Observable<object> {

    return this.httpClient.delete<object>(environment.serverUrl + this.ENDPOINTS.cart + this.ENDPOINTS.cartItem + cartId + '/' + itemId);
  }

  addToCart(product: productCartModel): Observable<object> {

    return this.httpClient.post<object>(environment.serverUrl + this.ENDPOINTS.cart + this.ENDPOINTS.cartItem, product).pipe(
      catchError(errorRes => {
        return of(undefined);
      }),
      map( res => {
        if (res) {
          this.getProducts(product.cartId).subscribe( res => {console.log(res);
            this.productsInCart.next(res);
          })
          return res;
        }
      })
    );
  }

}
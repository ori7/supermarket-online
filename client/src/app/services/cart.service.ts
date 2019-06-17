import { Injectable } from '@angular/core';
import { CartModel } from '../models/cart';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductCartModel } from '../models/productCart';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart: BehaviorSubject<ProductCartModel[]>
  ENDPOINTS = {
    cart: "cart/",
    carts: "carts/",
    cartItem: "cartItem/",
    cartItems: "cartItems/"
  }

  constructor(private httpClient: HttpClient) { 

    this.productsInCart = new BehaviorSubject<ProductCartModel[]>(null);
  }

  getCart(userId: number, status: string): Observable<CartModel> {

    return this.httpClient.post<CartModel>(environment.serverUrl + this.ENDPOINTS.cart + userId, {status: status} );
  }

  createCart(userId: number): Observable<CartModel> {

    return this.httpClient.get<CartModel>(environment.serverUrl + this.ENDPOINTS.cart + userId);
  }

  getProducts(id: number): Observable<ProductCartModel[]> {

    return this.httpClient.get<ProductCartModel[]>(environment.serverUrl + this.ENDPOINTS.cart + this.ENDPOINTS.cartItems + id);
  }

  deleteItem(cartId: number, itemId: number): Observable<object> {

    return this.httpClient.delete<object>(environment.serverUrl + this.ENDPOINTS.cart + this.ENDPOINTS.cartItem + itemId).pipe(
      catchError(errorRes => {
        return of(undefined);
      }),
      map( res => {
        if (res) {
          this.updateProductsInCart(cartId);
          return res;
        }
      })
    );
  }

  addToCart(product: ProductCartModel): Observable<object> {

    return this.httpClient.post<object>(environment.serverUrl + this.ENDPOINTS.cart + this.ENDPOINTS.cartItem, product).pipe(
      catchError(errorRes => {
        return of(undefined);
      }),
      map( res => {
        if (res) {
          this.updateProductsInCart(product.cartId);
          return res;
        }
      })
    );
  }

  updateProductsInCart(cartId): void {

    this.getProducts(cartId).subscribe( res => {
      this.productsInCart.next(res);
    })
  }

}
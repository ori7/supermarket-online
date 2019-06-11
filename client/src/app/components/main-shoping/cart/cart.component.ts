import { Component, OnInit, Input } from '@angular/core';
import { cartModel } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { productCartModel } from 'src/app/models/productCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() userId: number;
  cart: cartModel;
  products: productCartModel[];
  emptyCart: string;

  constructor(private cartService: CartService) { }

  ngOnInit() {

    this.cartService.getCart(this.userId).subscribe(res => {
      this.cart = res; console.log(this.cart);
      this.cartService.getProducts(this.cart._id).subscribe(resProducts => {
        this.products = resProducts; console.log(this.products);
      })
    })

    this.cartService.productsInCart.subscribe(res => {
      if (res) {
        this.emptyCart = null;
        this.products = res;
      }
      else {
        this.emptyCart = 'Your cart is empty!'
      }
    })
  }

}

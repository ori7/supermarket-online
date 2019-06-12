import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() orderStart: boolean;
  cart: cartModel;
  products: productCartModel[];
  emptyCart: string;
  totalPrice: number;
  @Output() orderView: EventEmitter<number> = new EventEmitter<number>(); 

  constructor(private cartService: CartService) { }

  ngOnInit() {console.log(this.orderStart);

    this.products = <productCartModel[]>[];

    this.cartService.getCart(this.userId).subscribe(res => {
      this.cart = res; console.log(this.cart);
      this.cartService.getProducts(this.cart._id).subscribe(resProducts => {
        this.products = resProducts; console.log(this.products);
        this.getTotalPrice(this.products);
      })
    })

    this.cartService.productsInCart.subscribe(res => {
      this.products = res;
      if (this.products) {
        this.getTotalPrice(this.products);
      }
    })

    this.emptyCart = 'Your cart is empty!';
  }

  getTotalPrice(products) {

    this.totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.totalPrice += products[i].price;
    }
  }

  order() {

    this.orderView.emit(this.totalPrice);
  }
}

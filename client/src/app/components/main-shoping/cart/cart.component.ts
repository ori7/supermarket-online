import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartModel } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { ProductCartModel } from 'src/app/models/productCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() userId: number;
  @Input() onlyView: string;
  cart: CartModel;
  products: ProductCartModel[];
  emptyCart: string;
  totalPrice: number;
  @Output() orderView: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cartService: CartService) { }

  ngOnInit() {

    this.products = <ProductCartModel[]>[];

    if (this.onlyView) {
      this.cartService.getCart(this.userId, this.onlyView).subscribe(res => {
        this.cart = res; console.log(this.cart);
        this.getProducts(this.cart._id);
      })
    }
    else {console.log(2);
      this.cartService.getCart(this.userId, 'open').subscribe(res => {console.log(res);
        if (res) {
          this.cart = res; console.log(this.cart);
          this.getProducts(this.cart._id);
        }
        else {console.log('res');
          this.cartService.createCart(this.userId).subscribe(newCart => {
            this.cart = newCart; console.log(this.cart);
            this.getProducts(this.cart._id);
          })
        }
      })
    }

    this.cartService.productsInCart.subscribe(res => {
      this.products = res;
      if (this.products) {
        this.getTotalPrice(this.products);
      }
    })

    this.emptyCart = 'Your cart is empty!';
  }

  getProducts(id) {

    this.cartService.getProducts(id).subscribe(resProducts => {
      this.products = resProducts; console.log(this.products);
      this.getTotalPrice(this.products);
    })
  }
  
  getTotalPrice(products) {

    this.totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.totalPrice += products[i].price;
    }
  }

  order() {

    this.orderView.emit(this.cart._id);
  }
}
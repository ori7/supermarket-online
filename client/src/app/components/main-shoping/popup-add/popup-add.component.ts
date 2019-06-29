import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product';
import { ProductCartModel } from 'src/app/models/productCart';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/models/cart';

@Component({
  selector: 'app-popup-add',
  templateUrl: './popup-add.component.html',
  styleUrls: ['./popup-add.component.css']
})
export class PopupAddComponent implements OnInit {

  productId: number;
  userId: number;
  product: ProductModel;
  quantity: number;
  productCart: ProductCartModel;
  cart: CartModel;

  constructor(public activeModal: NgbActiveModal,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {

    this.product = <ProductModel>{};
    this.productCart = <ProductCartModel>{};
    this.quantity = 1;

    this.productsService.getById(this.productId).subscribe(res => {
      this.product = res; console.log(this.product);
    })

    this.cartService.getCart(this.userId, 'open').subscribe(res => {
      this.cart = res; console.log(this.cart);
    })
  }

  addToCart() {

    this.productCart.productId = this.productId;
    this.productCart.quantity = this.quantity;
    this.productCart.cartId = this.cart._id;
    this.productCart.price = this.product.price * this.quantity;
    this.cartService.addToCart(this.productCart).subscribe(
      res => {
        alert('The product added successfully!');
      },
      error => {
        alert('Failed! Try again!');
      }
    )
  }
}

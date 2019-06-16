import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product';
import { productCartModel } from 'src/app/models/productCart';
import { CartService } from 'src/app/services/cart.service';
import { cartModel } from 'src/app/models/cart';

@Component({
  selector: 'app-popup-add',
  templateUrl: './popup-add.component.html',
  styleUrls: ['./popup-add.component.css']
})
export class PopupAddComponent implements OnInit {

  id: number;
  userId: number;
  product: ProductModel;
  quantity: number;
  productCart: productCartModel;
  cart: cartModel;

  constructor(public activeModal: NgbActiveModal,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {

    this.product = <ProductModel>{};
    this.productCart = <productCartModel>{};
    this.quantity = 1;

    this.productsService.getById(this.id).subscribe(res => {
      this.product = res; console.log(this.product);
    })

    this.cartService.getCart(this.userId, 'open').subscribe(res => {
      this.cart = res;
    })
  }

  addToCart() {

    this.productCart.productId = this.id;
    this.productCart.quantity = this.quantity;
    this.productCart.cartId = this.cart._id;
    this.productCart.price = this.product.price * this.quantity;
    console.log(this.productCart);
    this.cartService.addToCart(this.productCart).subscribe(res => {
      if (res)
        alert('The product added successfully!');
      else
        alert('Failed! Try again!');
    })
  }
}

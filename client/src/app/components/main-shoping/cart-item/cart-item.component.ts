import { Component, OnInit, Input } from '@angular/core';
import { ProductCartModel } from 'src/app/models/productCart';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductModel } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { HighlightPipe } from 'src/app/pipes/highlight.pipe';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() product: ProductCartModel;
  @Input() onlyView: string;
  productDetails: ProductModel;
  name: string;
  textToMark: string;
  
  constructor(private productsService: ProductsService,
    private cartService: CartService,
    private orderService: OrderService,
    private highlightPipe: HighlightPipe) { 
      this.productDetails = <ProductModel>{};
    }

  ngOnInit() {

    this.productsService.getById(this.product.productId).subscribe( res => {
      this.productDetails = res;
      this.name = res.name;
    })

    if (this.onlyView) {

      this.orderService.mark.subscribe( res => {
        this.textToMark = res; console.log(this.textToMark);
      })
    }
  }

  delete() {console.log(this.product.cartId + this.product._id);

    this.cartService.deleteItem(this.product.cartId, this.product._id).subscribe( res => {
      alert('The product deleted!');
    })
  }

}

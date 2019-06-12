import { Component, OnInit, Input } from '@angular/core';
import { productCartModel } from 'src/app/models/productCart';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() product: productCartModel;
  name: string;
  
  constructor(private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit() {

    this.productsService.getById(this.product.productId).subscribe( res => {
      this.name = res.name;
    })
  }

  delete() {console.log(this.product.cartId + this.product._id);

    this.cartService.deleteItem(this.product.cartId, this.product._id).subscribe( res => {
      alert('The product deleted!');
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ProductModel;

  constructor() { }

  ngOnInit() {

    this.product = <ProductModel>{};
  }

  addProduct() {

    console.log(this.product);
  }
}

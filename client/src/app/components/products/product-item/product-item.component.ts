import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() updateProduct: EventEmitter<number> = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit() {
  }

  update() {

    console.log(this.product.id);
    this.updateProduct.emit(this.product.id);
  }

}

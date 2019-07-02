import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productsArray: ProductModel[];
  @Output() productId: EventEmitter<number> = new EventEmitter<number>();
  @Input() search: string | number;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {

    this.productsService.getAllProducts().subscribe(res => {
      this.productsArray = res;
    });

  }

  passId(id: number) {

    this.productId.emit(id);
  }

  ngOnChanges(changes: SimpleChanges) {   //   Catch changes in the input of search and Filter by this.

    if (changes.search.currentValue != null) {
      this.productsService.getProductsWithfilter().subscribe(res => {
        this.productsArray = res;
      });
    }
  }
}

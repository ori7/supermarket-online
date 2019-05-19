import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productsArray: ProductModel[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {

    this.productsService.getProducts().subscribe( res => {
      this.productsArray = res;console.log(res);
    });

  }

}

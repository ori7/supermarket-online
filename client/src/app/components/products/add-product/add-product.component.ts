import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryModel } from 'src/app/models/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ProductModel;
  categories: CategoryModel[];

  constructor(private productsService: ProductsService) {

    this.product = <ProductModel>{};
   }

  ngOnInit() {

    this.productsService.getCategories().subscribe( res => {console.log(res);
      this.categories = res;
    })
  }

  addProduct() {

    console.log(this.product);
  }

}

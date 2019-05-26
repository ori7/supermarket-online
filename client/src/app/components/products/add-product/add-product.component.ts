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

    this.productsService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }

  addProduct() {
    
    this.product.categoryId = Number(this.product.categoryId);
    console.log(this.product);

    this.productsService.insertProduct(this.product).subscribe(res => {
      if (res)
        alert('The product ' + res + ' added successfully!');
      else
        alert('Failed!');
    })
  }

}
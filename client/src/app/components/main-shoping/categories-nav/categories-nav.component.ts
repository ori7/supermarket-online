import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-nav',
  templateUrl: './categories-nav.component.html',
  styleUrls: ['./categories-nav.component.css']
})
export class CategoriesNavComponent implements OnInit {

  categories: CategoryModel[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {

    this.productsService.getCategories().subscribe( res => {
      this.categories = res;
    })

  }

  filter(categoryId) {

    this.productsService.filterCategories.next(categoryId);
  }
}

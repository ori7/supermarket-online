import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  ENDPOINTS = {
    products: "products",
    categories: "categories",
    filter: "/filter"
  };
  filterProducts: BehaviorSubject<string>;
  filterCategories: BehaviorSubject<number | string>;
  filter: object;

  constructor(private httpClient: HttpClient) {

    this.filterProducts = new BehaviorSubject<string>(null);
    this.filterCategories = new BehaviorSubject<number | string>(null);
   }

  getProducts(): Observable<ProductModel[]> {

    return this.httpClient.get<ProductModel[]>(environment.serverUrl + this.ENDPOINTS.products);
    return of([
      {
        _id: 1,
        name: 'Egg carton',
        categoryId: 2,
        price: 15,
        picture: 'assets/upload/eggs.jpg'
      },
      {
        _id: 2,
        name: 'Bread',
        categoryId: 3,
        price: 10,
        picture: 'assets/upload/bread.jpg'
      },
      {
        _id: 3,
        name: 'Bottle of water',
        categoryId: 5,
        price: 10,
        picture: 'assets/upload/water.jpg'
      }
    ])
  }

  getCategories(): Observable<CategoryModel[]> {

    return this.httpClient.get<CategoryModel[]>(environment.serverUrl + this.ENDPOINTS.categories);
  }

  getProductsWithfilter():Observable<ProductModel[]> {

    this.filter = {};

    if (this.filterProducts.getValue()) {
      this.filter['products'] = this.filterProducts.getValue();
    }
    if (this.filterCategories.getValue() != null && this.filterCategories.getValue() != 'all') {
      this.filter['category'] = this.filterCategories.getValue();
    }

    return this.httpClient.post<ProductModel[]>(environment.serverUrl + this.ENDPOINTS.products + this.ENDPOINTS.filter, this.filter);
  }
}
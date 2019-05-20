import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    categories: "categories"
  };

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {

    return  of([
      {
        id: 1,
        name: 'Egg carton',
        categoryId: 'Food',
        price: 15,
        picture: 'assets/upload/eggs.jpg'
      },
      {
        id: 2,
        name: 'Bread',
        categoryId: 'Pastries',
        price: 10,
        picture: 'assets/upload/bread.jpg'
      },
      {
        id: 3,
        name: 'Bottle of water',
        categoryId: 'Drink',
        price: 10,
        picture: 'assets/upload/water.jpg'
      }
    ]) 
  }

  getCategories(): Observable<CategoryModel[]> {

    return this.httpClient.get<CategoryModel[]>(environment.serverUrl + this.ENDPOINTS.categories);
  }
}

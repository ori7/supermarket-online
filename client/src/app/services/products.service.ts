import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  ENDPOINTS = {
    products: "products/",
    categories: "categories",
    info: "info/",
    filter: "filter",
    quantity: "quantity"
  };
  filterProducts: BehaviorSubject<string>;
  filterCategories: BehaviorSubject<number | string>;
  filter: object;

  constructor(private httpClient: HttpClient) {

    this.filterProducts = new BehaviorSubject<string>(null);
    this.filterCategories = new BehaviorSubject<number | string>(null);
   }

  getAllProducts(): Observable<ProductModel[]> {

    return this.httpClient.get<ProductModel[]>(environment.serverUrl + this.ENDPOINTS.products);
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

  getById(id: number): Observable<ProductModel> {

    return this.httpClient.get<ProductModel>(environment.serverUrl + this.ENDPOINTS.products + id);
  }

  getQuantity(id: string): Observable<number> {

    return this.httpClient.post<number>(environment.serverUrl + this.ENDPOINTS.info + this.ENDPOINTS.quantity, {id: id});
  }
}
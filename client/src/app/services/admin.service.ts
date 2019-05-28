import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 ENDPOINTS = {
    products: "products",
    categories: "categories",
    id: "/id",
    update: "/update",
    filter: "/filter"
  };
  adminPage: BehaviorSubject<string>;
  updateId: BehaviorSubject<number>;

  constructor(private httpClient: HttpClient) {

    this.adminPage = new BehaviorSubject<string>('');
    this.updateId = new BehaviorSubject<number>(null);
   }

  getCategories(): Observable<CategoryModel[]> {

    return this.httpClient.get<CategoryModel[]>(environment.serverUrl + this.ENDPOINTS.categories);
  }

  insertProduct(product): Observable<string> {

    return this.httpClient.post<string>(environment.serverUrl + this.ENDPOINTS.products, product);
  }

  getById(id: object):Observable<ProductModel> {

    return this.httpClient.post<ProductModel>(environment.serverUrl + this.ENDPOINTS.products + this.ENDPOINTS.id, id);
  }
  
  updateProduct(product: object):Observable<string> {

    return this.httpClient.post<string>(environment.serverUrl + this.ENDPOINTS.products + this.ENDPOINTS.update, product);
  }

}
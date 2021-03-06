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
    admin: "admin/",
    products: "products/",
    categories: "categories",
    insert: "insert",
    update: "update",
    saveFile: "saveFile"
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

    return this.httpClient.post<string>(environment.serverUrl + this.ENDPOINTS.admin + this.ENDPOINTS.insert, product);
  }

  getById(id: number): Observable<ProductModel> {

    return this.httpClient.get<ProductModel>(environment.serverUrl + this.ENDPOINTS.products + id);
  }

  updateProduct(product: object): Observable<string> {

    return this.httpClient.put<string>(environment.serverUrl + this.ENDPOINTS.admin + this.ENDPOINTS.update, product);
  }

  saveImage(img: object) {

    return this.httpClient.post<object>(environment.serverUrl + this.ENDPOINTS.saveFile, img);
  }

}
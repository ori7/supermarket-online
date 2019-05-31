import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sideBar: string;
  name: string;
  search: string | number;

  constructor(private productsService: ProductsService,
    private adminService: AdminService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {

    if (!this.loginService.dstails.getValue().length) {   //  The page refreshes. The admin needs to reconnect!
      this.router.navigate(['/logOut']);
    }

    this.name = sessionStorage.getItem('name');

    this.productsService.filterProducts.subscribe(res => {
      this.search = res;
    });
    this.productsService.filterCategories.subscribe(res => {
      this.search = res;
    });

    this.adminService.adminPage.subscribe(res => {
      this.sideBar = res;
    });
  }

  updateProduct(id: number) {

    this.adminService.updateId.next(id);
    this.adminService.adminPage.next('update');
  }

}

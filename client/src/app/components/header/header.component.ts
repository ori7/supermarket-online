import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string;
  admin: boolean;
  searchInput: string;
  filterCategory: number |string;

  constructor(private loginService: LoginService,
    private adminService: AdminService,
    private productsService: ProductsService) { }

  ngOnInit() {

    this.loginService.details.subscribe(res => {
      this.name = res[0];  
      if (res[1] === 'admin')
        this.admin = true;
    })

    /*
    This subscribe is used to reset the product filtering when the user chooses to filter by category.
    (but after a category is selected, you can filter the products in it).
    */
    this.productsService.filterCategories.subscribe( res => {
      this.searchInput = '';
      this.productsService.filterProducts.next(null);
    })
  }

  addForm() {

    this.adminService.adminPage.next('add');
  }

  filter() {

    this.productsService.filterProducts.next(this.searchInput);
  }

}

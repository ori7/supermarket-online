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

  constructor(private loginService: LoginService,
    private adminService: AdminService,
    private productsService: ProductsService) { }

  ngOnInit() {

    this.loginService.header.subscribe(res => {
      this.name = res[0];  
      if (res[1] === 'admin')
        this.admin = true;
    })
  }

  addForm() {

    this.adminService.adminPage.next('add');
  }

  filter() {

    this.productsService.filter.next(this.searchInput);
  }



}

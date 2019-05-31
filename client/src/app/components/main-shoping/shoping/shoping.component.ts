import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { ProductsService } from 'src/app/services/products.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  user:UserModel;
  search: string | number;

  constructor(private productsService: ProductsService,
    private loginService: LoginService,
    private router: Router) { 

  }

  ngOnInit() {

    this.productsService.filterProducts.subscribe( res => {
      this.search = res;
    });
    this.productsService.filterCategories.subscribe( res => {
      this.search = res;
    });

    if (!this.loginService.dstails.getValue().length) {   //  The page refreshes. Navigate to the 'login' page to refresh user data. 
      this.router.navigate(['/login']);
    }

  }

}

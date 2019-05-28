import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  user:UserModel;
  search: string;

  constructor(private productsService: ProductsService) { 

  }

  ngOnInit() {

    this.productsService.filter.subscribe( res => {
      this.search = res;
    })
  }

}

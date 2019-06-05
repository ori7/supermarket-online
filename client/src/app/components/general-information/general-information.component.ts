import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {

  QuantityOfProducts: number;
  QuantityOfOrders: number;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {

    this.productsService.getQuantity('productId').subscribe( res => {
      this.QuantityOfProducts = res;
    });

    this.productsService.getQuantity('orderId').subscribe( res => {
      this.QuantityOfOrders = res;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-popup-add',
  templateUrl: './popup-add.component.html',
  styleUrls: ['./popup-add.component.css']
})
export class PopupAddComponent implements OnInit {

  id: number;
  product: ProductModel;
  quantity: number;

  constructor(public activeModal: NgbActiveModal,
    private productsService: ProductsService
  ) { }

  ngOnInit() {

    this.product = <ProductModel>{};

    this.productsService.getById(this.id).subscribe(res => {
      this.product = res; console.log(this.product);
    })
  }

  addToCart() {
    console.log(this.quantity);
  }
}

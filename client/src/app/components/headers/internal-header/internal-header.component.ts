import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-internal-header',
  templateUrl: './internal-header.component.html',
  styleUrls: ['./internal-header.component.css']
})
export class InternalHeaderComponent implements OnInit {

  name: string;
  searchInput: string;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {

    this.name = sessionStorage.getItem('name');
  }

  filter() {

    this.productsService.filter.next(this.searchInput);
  }

}

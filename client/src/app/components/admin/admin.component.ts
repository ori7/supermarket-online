import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sideBar: string;
  updateId: number;
  name: string; 
  search: string;

  constructor(private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() { 

    this.name = sessionStorage.getItem('name');
    this.productsService.filter.subscribe( res => {
      this.search = res;
    })
   }

  addForm() {

    this.sideBar = 'add';
  }

  updateProduct(id: number) {

    this.sideBar = '';
    this.changeDetectorRef.detectChanges();
    this.updateId = id;
    this.sideBar = 'update';
  }
  
}

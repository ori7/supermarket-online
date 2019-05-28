import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sideBar: string;
  name: string; 
  search: string;

  constructor(private productsService: ProductsService,
    private adminService: AdminService) { }

  ngOnInit() { 

    this.name = sessionStorage.getItem('name');
    this.productsService.filter.subscribe( res => {
      this.search = res;
      this.adminService.adminPage.subscribe( res => {
        this.sideBar = res;
      })
    })
   }

  updateProduct(id: number) {

    this.adminService.updateId.next(id);
    this.adminService.adminPage.next('update');
  }
  
}

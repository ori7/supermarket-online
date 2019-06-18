import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { CategoryModel } from 'src/app/models/category';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ProductModel;
  categories: CategoryModel[];

  constructor(private adminService: AdminService,
    private router: Router) {

    this.product = <ProductModel>{};
  }

  ngOnInit() {

    this.adminService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }

  addProduct() {
    
    this.product.categoryId = Number(this.product.categoryId);
    console.log(this.product);

    this.adminService.insertProduct(this.product).subscribe(res => {
      if (res) {
        alert('The product ' + res + ' added successfully!');
        /*
        We need to refresh 'admin' page for it will be updated on the new data.
        Since we are inside the 'admin' page, we can't navigate to the same page. 
        So we navigated through another middle address, and when we get back to this page, it refreshes.
        */
        this.router.navigate(["/refrsh"], { skipLocationChange: true }).then(() =>
        this.router.navigate(["/admin"]));
      }
      else
        alert('Failed!');
    })
  }

}

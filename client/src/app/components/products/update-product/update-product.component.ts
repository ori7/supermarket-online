import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { CategoryModel } from 'src/app/models/category';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    product: ProductModel;
    categories: CategoryModel[];
    file: File;

    constructor(private adminService: AdminService,
        private router: Router) { }

    ngOnInit() {

        this.product = <ProductModel>{};

        this.adminService.getCategories().subscribe( res => {
            this.categories = res;
        })

        this.adminService.updateId.subscribe( res => {
            this.adminService.getById( res ).subscribe(res => {
                this.product = res;
            })
        })
    }

    updateProduct() {

        this.product.categoryId = Number(this.product.categoryId);
        if (this.file) {
            this.product.picture = "assets/upload/" + this.file['name'];
            this.saveImage();
        }
        this.adminService.updateProduct(this.product).subscribe( res => {
            if (res) {
                alert('The product ' + res + ' updated successfully!');
                this.router.navigate(["/refrsh"], { skipLocationChange: true }).then(() =>
                    this.router.navigate(["/admin"]));
            }
            else
                alert('Failed!');
        })
    }

    onFileSelected(event) {

        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    saveImage() {

      // TODO: Save the image in the assets/upload folder
      this.adminService.saveImage(this.file).subscribe( res => {
        console.log('good');
      })
    }

}

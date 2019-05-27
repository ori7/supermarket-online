import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryModel } from 'src/app/models/category';
import { Router } from '@angular/router';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    @Input() productId: number;
    product: ProductModel;
    categories: CategoryModel[];
    file: File;

    constructor(private productsService: ProductsService,
        private router: Router) { }

    ngOnInit() {

        this.productsService.getCategories().subscribe(res => {
            this.categories = res;
        })

        this.product = <ProductModel>{};

        this.productsService.getById({ id: this.productId }).subscribe(res => {
            this.product = res;
        })
    }

    updateProduct() {
        console.log(this.product);

        this.product.categoryId = Number(this.product.categoryId);
        if (this.file) {
            this.product.picture = "assets/upload/" + this.file['name'];
            this.saveImage();
        }
        this.productsService.updateProduct(this.product).subscribe(res => {
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
            console.log(event.target.files[0].name);
        }
    }

    saveImage() {

      // TODO: Save the image in the assets/upload folder
    }

}

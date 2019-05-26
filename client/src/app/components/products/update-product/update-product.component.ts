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

    this.product.categoryId = Number(this.product.categoryId);
    this.productsService.updateProduct(this.product).subscribe( res => {
      if (res) {
        alert('The product ' + res + ' updated successfully!');
        this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/admin"]));       }
      else
        alert('Failed!');
    })
  }
}

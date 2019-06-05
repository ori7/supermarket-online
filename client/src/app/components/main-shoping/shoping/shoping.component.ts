import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { ProductsService } from 'src/app/services/products.service';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { cartModel } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopupAddComponent } from '../popup-add/popup-add.component';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  user: UserModel;
  search: string | number;
  cart: cartModel;
  addProductDialogRef: MatDialogRef<PopupAddComponent>;

  constructor(private productsService: ProductsService,
    private loginService: LoginService,
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog) { 

      this.user = <UserModel>{};
  }

  ngOnInit() {

    /*
    The two subscriptions below,
    are responsible for updating the variable 'search' that is passed to 'ProductsListComponent',
    whose function is to: Filter products according to user requests.
    */
    this.productsService.filterProducts.subscribe( res => {
      this.search = res;
    });
    this.productsService.filterCategories.subscribe( res => {
      this.search = res;
    });

    if (!this.loginService.dstails.getValue().length) {   //  The page refreshes. Navigate to the 'login' page to refresh user data. 
      this.router.navigate(['/login']);
    }

    this.cartService.currentCart.subscribe( res => {
      this.cart = res;
    });

    this.activatedRoute.params.subscribe( p => {
      this.cartService.getCart(p.id).subscribe( res => {
        this.cartService.currentCart.next(res);
      })
    })
  }

  openPopupWindow(id: number) {console.log(id);

    this.addProductDialogRef = this.matDialog.open(PopupAddComponent);
  }
}

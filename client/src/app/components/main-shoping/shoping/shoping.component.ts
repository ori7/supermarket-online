import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { ProductsService } from 'src/app/services/products.service';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupAddComponent } from '../popup-add/popup-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  user: UserModel;
  search: string | number;
  userId: number;
  totalPrice: number;
  onlyView: string;

  constructor(private productsService: ProductsService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal) { 

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

    this.activatedRoute.params.subscribe( p => {
      this.userId = p.id;
    })
  }

  openPopupWindow(id: number) {console.log(id);

    const modalRef = this.ngbModal.open(PopupAddComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.userId = this.userId;
  }

  openOrder(totalPrice) {

    this.onlyView = 'open';
    this.totalPrice = totalPrice;
  }
}

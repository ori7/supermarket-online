import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  userId: number;
  cartId: number;
  onlyView: string;
  searce: any;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.onlyView = 'open';
    this.activatedRoute.params.subscribe(p => {
      this.userId = p.userId;
      this.cartId = p.cartId;
    })
    this.searce = '';

    if (this.loginService.details.getValue().length) {
      this.loginService.details.next([this.loginService.details.getValue()[0], 'order']);    //   Delete the form of searce products from the header
    }
    else {
      this.router.navigate(['/login']);   //  The page refreshes. Navigate to the 'login' page to refresh user data.
    }

  }

  keyPress() {

    this.orderService.mark.next(this.searce);
  }

  backToShoping() {

    this.router.navigate(['/shoping', this.userId]);
  }

  ngOnDestroy(): void {

    this.orderService.mark.next(null);  //   Empty the BehaviorSubject of 'mark' when we leave the page
    this.loginService.details.next([this.loginService.details.getValue()[0]]);    //   Return the form of searce products to the header (by remove from 'details' the second item)
  }

}
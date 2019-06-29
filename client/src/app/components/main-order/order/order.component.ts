import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { UserModel } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupConfirmComponent } from '../popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  alertArray: string[];
  citiesList: string[];
  user: UserModel;
  totalPrice: number;

  orderForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    date: new FormControl(''),
    creditCard: new FormControl(''),
  });

  @Input() userId: number;
  @Input() cartId: number;

  constructor(private registerService: RegisterService,
    private orderService: OrderService,
    private ngbModal: NgbModal) {

    this.alertArray = [];
    this.citiesList = [];
  }

  ngOnInit() {
    console.log(this.cartId);

    const cities = this.registerService.getCities();
    for (const key in cities) {
      this.citiesList.push(cities[key]);
    }

    this.orderService.getTotalPrice(this.cartId).subscribe( res => {
      this.totalPrice = res;
    })

  }

  order() {

    this.checkValues();
    if (this.alertArray.length === 0) {
      this.orderService.makeOrder(this.userId, this.cartId).subscribe( res => {
        if (res) {
          this.openPopupWindow();
        }
        else {
          alert('failed');
        }
      })
    }
  }

  enterStreet() {

    if (this.user) {
      this.orderForm.patchValue({ street: this.user.street });
    }
    else {
      this.orderService.getUser(this.userId).subscribe(res => {
        this.user = res;
        this.orderForm.patchValue({ street: this.user.street });
      });
    }
  }

  enterCity() {

    if (this.user) {
      this.orderForm.patchValue({ city: this.user.city });
    }
    else {
      this.orderService.getUser(this.userId).subscribe(res => {
        this.user = res;
        this.orderForm.patchValue({ city: this.user.city });
      });
    }
  }

  checkValues() {

    this.alertArray = [];
    for (var key in this.orderForm.value) {
      if (this.orderForm.value[key] === '') {
        this.alertArray.push(key + ' required!');
      }
    }
  }

  openPopupWindow() {

    const modalRef = this.ngbModal.open(PopupConfirmComponent);
    modalRef.componentInstance.cartId = this.cartId;
  }

}

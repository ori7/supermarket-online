import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { UserModel } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  alertArray: string[];
  citiesList: string[];
  user: UserModel;

  orderForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    date: new FormControl(''),
    creditCard: new FormControl(''),
  });

  @Input() userId: number;
  @Input() cartId: number;

  constructor(private registerService: RegisterService,
    private orderService: OrderService) {

    this.alertArray = [];
    this.citiesList = [];
  }

  ngOnInit() {
    console.log(this.cartId);

    const cities = this.registerService.getCities();
    for (const key in cities) {
      this.citiesList.push(cities[key]);
    }

  }

  order() {

    this.checkValues();
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

    for (var key in this.orderForm.value) {
      if (this.orderForm.value[key] === '') {
        this.alertArray.push(key + ' required!');
      }
    }
  }

}

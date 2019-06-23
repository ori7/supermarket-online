import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  alertArray: string[];
  citiesList: string[];

  orderForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    date: new FormControl(''),
    creditCard: new FormControl(''),
  });
  
  @Input() cartId: number;

  constructor(private registerService: RegisterService) { 

    this.alertArray = [];
    this.citiesList = [];
  }

  ngOnInit() {console.log(this.cartId);

    const cities = this.registerService.getCities();
    for (const key in cities) {
      this.citiesList.push(cities[key]);
    }
  }

  order() {

    this.checkValues();
  }

  checkValues() {

    for (var key in this.orderForm.value) {
      if (this.orderForm.value[key] === '') {
        this.alertArray.push(key + ' required!');
      }
    }
  }

}

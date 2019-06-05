import { Component, OnInit, Input } from '@angular/core';
import { cartModel } from 'src/app/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() cart: cartModel;

  constructor() { }

  ngOnInit() {
  }

}

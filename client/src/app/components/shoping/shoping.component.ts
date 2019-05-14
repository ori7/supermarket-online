import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  user:UserModel;

  constructor() { 

    this.user = <UserModel>{};
  }

  ngOnInit() {

    this.user.name = sessionStorage.getItem('user');
  }

}

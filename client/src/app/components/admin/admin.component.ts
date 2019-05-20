import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sideBar: string;

  constructor() { }

  ngOnInit() {  }

  addForm() {

    this.sideBar = 'add';console.log(this.sideBar);
  }

  updateProduct(id: number) {

    this.sideBar = 'update'; console.log(id);
  }
}

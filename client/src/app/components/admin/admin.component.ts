import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sideBar: string;
  updateId: number;
  admin: string; 

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() { 

    this.admin = sessionStorage.getItem('user');
   }

  addForm() {

    this.sideBar = 'add';
  }

  updateProduct(id: number) {

    this.sideBar = '';
    this.changeDetectorRef.detectChanges();
    this.updateId = id;
    this.sideBar = 'update';
  }

}

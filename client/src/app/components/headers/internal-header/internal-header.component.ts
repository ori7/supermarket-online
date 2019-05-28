import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-header',
  templateUrl: './internal-header.component.html',
  styleUrls: ['./internal-header.component.css']
})
export class InternalHeaderComponent implements OnInit {

  name: string;

  constructor() { }

  ngOnInit() {

    this.name = sessionStorage.getItem('user');
  }

}

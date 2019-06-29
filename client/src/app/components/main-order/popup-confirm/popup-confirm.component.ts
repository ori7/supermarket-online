import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.css']
})
export class PopupConfirmComponent implements OnInit {

  cartId: number;

  constructor(public activeModal: NgbActiveModal,
    private router: Router) { }

  ngOnInit() {
  }

  downloadReceipt() {

    console.log('downloadReceipt' + this.cartId);
  }

  navigateToMainPaig() {

    this.router.navigate(['/login']);
  }
}

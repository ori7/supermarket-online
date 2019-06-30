import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.css']
})
export class PopupConfirmComponent implements OnInit {

  cartId: number;

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
  }

  downloadReceipt() {

    console.log('downloadReceipt' + this.cartId);
    this.orderService.getReceipt(this.cartId).subscribe( res => {
      console.log(res);
      //  TODO: download file.
    })
  }

  navigateToMainPaig() {

    this.router.navigate(['/login']);
  }
}

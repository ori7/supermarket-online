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
  blob;

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
  }

  downloadReceipt() {

    console.log('downloadReceipt' + this.cartId);
    this.orderService.getReceipt(this.cartId).subscribe( res => {
      this.blob = res;
      this.blob.revokeObjectURL;
    })
  }

  navigateToMainPaig() {

    this.router.navigate(['/login']);
  }
}

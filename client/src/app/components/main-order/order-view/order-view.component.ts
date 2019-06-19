import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  userId: number;
  onlyView: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.onlyView = 'open';
    this.activatedRoute.params.subscribe( p => {
      this.userId = p.id;
    })
  }

  backToShoping() {

    this.router.navigate(['/shoping', this.userId]);
  }

}

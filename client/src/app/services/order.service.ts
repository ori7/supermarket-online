import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  mark: BehaviorSubject<string>;

  constructor() { 

    this.mark = new BehaviorSubject<string>(null);
  }
}

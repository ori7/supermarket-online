import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.css']
})
export class RegisterStepTwoComponent implements OnInit {

  alertArray: string[];
  citiesList: string[];

  registerForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl('Meltzer'),
    name: new FormControl('Dan'),
    lastName: new FormControl('Cohen'),
  });

  constructor(private router: Router,
    private registerService: RegisterService) {

    this.alertArray = [];
    this.citiesList = [];
  }

  ngOnInit() {

    const cities = this.registerService.getCities();
    for (const key in cities) {
      this.citiesList.push(cities[key]);
    }
  }

  save() {

    this.checkValues();
    this.registerService.createUser2(this.registerForm.value);
    this.registerService.saveUser().subscribe(res => {
      if (res){
        sessionStorage.setItem('user', res['user']);
        this.router.navigate(['/shoping']);
      }
    })
  }

  checkValues() {

    for (var key in this.registerForm.value) {
      if (this.registerForm.value[key] === '') {
        this.alertArray.push(key + ' required!');
      }
    }
  }

}

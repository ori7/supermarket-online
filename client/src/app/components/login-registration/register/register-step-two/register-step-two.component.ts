import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { LoginService } from 'src/app/services/login.service';

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
    street: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private router: Router,
    private registerService: RegisterService,
    private loginService: LoginService) {

    this.citiesList = [];
  }

  ngOnInit() {

    if (!this.registerService.newUser.getValue()) {
      this.router.navigate(['/logOut']);
    }

    const cities = this.registerService.getCities();
    for (const key in cities) {
      this.citiesList.push(cities[key]);
    }
  }

  save() {

    this.checkValues();
    if (this.alertArray.length === 0) {
      this.registerService.createUser2(this.registerForm.value);
      this.registerService.saveUser().subscribe(res => {
        if (res) {
          sessionStorage.setItem('user', res['user']);
          this.loginService.details.next([res['user']]);
          this.router.navigate(['/shoping', res['id']]);
        }
      })
    }
  }

  checkValues() {

    this.alertArray = [];
    for (var key in this.registerForm.value) {
      if (this.registerForm.value[key] === '') {
        this.alertArray.push('Error: ' + key + ' required!');
      }
    }
  }

}

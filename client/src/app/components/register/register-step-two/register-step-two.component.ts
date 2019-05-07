import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.css']
})
export class RegisterStepTwoComponent implements OnInit {

  //user: User;
  alertArray: string[];
  citiesList: string[];

  registerForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private activatedRoute: ActivatedRoute,
    private RegisterService: RegisterService) {

  //  this.user = <User>{};
    this.alertArray = [];
    this.citiesList = [];

  }

  ngOnInit() {
/*
    this.activatedRoute.params.subscribe(res => {
      this.user.id = res.id;
      this.user.email = res.email;
      this.user.password = res.password; console.log(res);
    })
*/
    const cities = this.RegisterService.getCities();
    for (const key in cities) {
      this.citiesList.push(cities[key]);
    }
    console.log(this.citiesList);
  }

  save() {

    this.checkValues();
    this.RegisterService.createUser2(this.registerForm.value);
    this.RegisterService.saveUser().subscribe( res => {

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

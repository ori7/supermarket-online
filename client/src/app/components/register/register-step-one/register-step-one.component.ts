import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'; 

@Component({
  selector: 'app-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.css']
})
export class RegisterStepOneComponent implements OnInit {

  alertArray: string[];

  registerForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('xxx@gmail.com'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(private RegisterService: RegisterService,
    private router: Router) {

    this.alertArray = [];
  }

  ngOnInit() { }

  nextRegister() {

    this.alertArray = [];
    this.checkValues();
    this.checkId();
    this.checkPassword();
    this.checkEmail();

    if (this.alertArray.length === 0){
      this.hashPassword();
      this.RegisterService.createUser1(this.registerForm.value);
      this.router.navigate(['register2']);
    }
    else {
      this.registerForm.controls.password.reset("");
      this.registerForm.controls.confirmPassword.reset("");
    }
  }

  checkValues() {

    for (var key in this.registerForm.value) {
      if (this.registerForm.value[key] === '') {
        this.alertArray.push(key + ' required!');
      }
    }
  }

  checkId() {

    this.RegisterService.checkId(this.registerForm.value.id).subscribe(res => {
      if (res)
        this.alertArray.push('The ID exists in the system!');
    })
  }

  checkPassword() {

    if (!(this.registerForm.value.password === this.registerForm.value.confirmPassword))
      this.alertArray.push('Password authentication failed!');
  }

  checkEmail() {

    var expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    if (!expression.test(this.registerForm.value.email) && (!(this.registerForm.value.email === '')))
      this.alertArray.push('The email in not valid!');
  }

  hashPassword() {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.registerForm.value.password, salt);
    this.registerForm.value.password = hash;
  }
}
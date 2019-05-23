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

  checkForm() {

    this.alertArray = [];
    this.checkValues();
    this.checkPassword();
    this.checkId();
    this.checkEmail();
    if (this.alertArray.length === 0)
      this.checkIdInTheSystem();
    else
      this.emptyPassword();
  }

  nextRegister() {

    if (this.alertArray.length === 0) {
      this.hashPassword();
      this.RegisterService.createUser1(this.registerForm.value);
      this.router.navigate(['register2']);
    }
    else {
      this.emptyPassword();
    }
  }

  checkValues() {

    for (var key in this.registerForm.value) {
      if (this.registerForm.value[key] === '') {
        this.alertArray.push('Error:' + key + ' required!');
      }
    }
  }

  checkPassword() {
/*
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!re.test(this.registerForm.value.password))
      this.alertArray.push('Error: Password do not match the rules!');
    else */ if (!(this.registerForm.value.password === this.registerForm.value.confirmPassword))
      this.alertArray.push('Error: Your password and confirmation password do not match!');
  }

  checkId() {

    if (isNaN(this.registerForm.value.id) || this.registerForm.value.id == null) {
      this.alertArray.push('Error: The ID must be a number!');
    }
  }

  checkEmail() {

    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    if (!re.test(this.registerForm.value.email) && !(this.registerForm.value.email === '')) {
      this.alertArray.push('Error: The email in not valid!');
    }
  }

  checkIdInTheSystem() {

    this.RegisterService.checkId({ id: this.registerForm.value.id }).subscribe(res => {
      if (!res){
        this.alertArray.push('Error: The ID exists in the system!');
        this.emptyPassword();
      }
      else
        this.checkEmailInTheSystem();
    })
  }

  checkEmailInTheSystem() {

    this.RegisterService.checkEmail({ email: this.registerForm.value.email }).subscribe(res => {
      if (!res){
        this.alertArray.push('Error: The email Already exists in the system!');
        this.emptyPassword();
      }
      else
        this.nextRegister();
    });
  }

  hashPassword() {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.registerForm.value.password, salt);
    this.registerForm.value.password = hash;
  }

  emptyPassword() {

    this.registerForm.controls.password.reset("");
    this.registerForm.controls.confirmPassword.reset("");
  }
}
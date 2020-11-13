import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LogInPair} from "../models/LogInPair";
import {TokensPair} from "../models/TokensPair";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  confirmPassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  logInPair: LogInPair;

  constructor() {
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, this.passwordValidator.bind(this));
  }

  logIn(form: FormGroup): void {
     this.logInPair = { email: form.controls.email.value, password: form.controls.password.value };
  }

  passwordValidator(form: FormGroup): null | object {
    const {value : password} = form.controls.password;
    const {value: confirmPassword} = form.controls.confirmPassword;
    return password === confirmPassword ? null : {passwordError: true};
  }
  ngOnInit(): void {
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LogInPair} from "../models/LogInPair";
import {TokensPair} from "../models/TokensPair";
import {AuthorizationService} from "../services/authorization.service";
import {Router} from "@angular/router";
import {query} from "@angular/animations";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  // confirmPassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  error: any;

  constructor(private authorizationService:AuthorizationService, private router: Router) {
    this.form = new FormGroup({
      username: this.username,
      password: this.password,
      // confirmPassword: this.confirmPassword
    });
    // , this.passwordValidator.bind(this));
  }

  logIn(form: FormGroup): void {
    this.authorizationService.logIn(form.getRawValue()).subscribe(() => {
      this.router.navigate(['users']);
    }, err => this.error = err.detail)
  }


  // passwordValidator(form: FormGroup): null | object {
  //   const {value : password} = form.controls.password;
  //   const {value: confirmPassword} = form.controls.confirmPassword;
  //   return password === confirmPassword ? null : {passwordError: true};
  // }
  ngOnInit(): void {
  }

}

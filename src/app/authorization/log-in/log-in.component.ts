import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from "../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  error: any;

  constructor(private authorizationService: AuthorizationService, private router: Router) {
    this.form = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  logIn(form: FormGroup): void {
    this.authorizationService.logIn(form.getRawValue()).subscribe(() => {
      this.router.navigate(['my_account']);
    }, err => this.error = err.detail)
  }

  ngOnInit(): void {
  }

}

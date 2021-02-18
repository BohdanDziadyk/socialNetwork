import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  confirmPassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  email: FormControl = new FormControl('',[Validators.required,Validators.email]);
  phone: FormControl = new FormControl('', [Validators.required]);
  first_name: FormControl = new FormControl('');
  last_name: FormControl = new FormControl('');
  error: any;

  constructor(private authorizationService:AuthorizationService, private router: Router) {
    this.form = new FormGroup({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      email: this.email,
      phone: this.phone,
      first_name: this.first_name,
      last_name: this.last_name,
    }, this.passwordValidator.bind(this));
  }
  passwordValidator(form: FormGroup): null | object {
    const {value : password} = form.controls.password;
    const {value: confirmPassword} = form.controls.confirmPassword;
    return password === confirmPassword ? null : {passwordError: true};
  }
  ngOnInit(): void {
  }

  register(form: FormGroup) {
    this.authorizationService.register(form.getRawValue()).subscribe(()=>{
      this.router.navigate(['auth/login']);
    }, error1 => {
      console.log(error1);})
  }
}

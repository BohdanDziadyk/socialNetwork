import { Component, OnInit } from '@angular/core';
import {UserAccountService} from "../services/user-account.service";
import {User} from "../../user/models/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user: User;
  form: FormGroup;
  passwordForm: FormGroup;
  image: FormControl = new FormControl('')
  first_name: FormControl = new FormControl('')
  last_name: FormControl = new FormControl('')
  email: FormControl = new FormControl('', [Validators.email])
  phone: FormControl = new FormControl('')
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  confirmPassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  constructor(private userAccountService: UserAccountService, private router: Router) {
    this.form = new FormGroup({
      image: this.image,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone
    })
    this.passwordForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    }, this.passwordValidator.bind(this));
  }
  passwordValidator(passwordForm: FormGroup): null | object {
    const {value : password} = passwordForm.controls.password;
    const {value: confirmPassword} = passwordForm.controls.confirmPassword;
    return password === confirmPassword ? null : {passwordError: true};
  }
  onFileUpload(event: any) {
    const[file] = event.target.files;
    this.form.patchValue({image:file})
  }
  save(form: FormGroup): void{
    const formData = new FormData();
    formData.set('first_name', form.controls.first_name.value?form.controls.first_name.value:this.user.first_name);
    formData.set('last_name', form.controls.last_name.value?form.controls.last_name.value:this.user.last_name);
    formData.set('email', form.controls.email.value?form.controls.email.value:this.user.email);
    formData.set('phone', form.controls.phone.value?form.controls.phone.value:this.user.phone);
    formData.set('image', form.get('image').value?form.get('image').value:this.user.image);
    form.reset()
    this.userAccountService.changeAccount(formData, this.user.id).subscribe(value => value.error?alert(value.error):alert("Changes saved"));
  }
  changePassword(passwordForm: FormGroup): void{
    this.userAccountService.changePassword({password: passwordForm.controls.password.value}, this.user.id).subscribe(value => {alert(value.details);
    this.router.navigate(['auth/login'])})
    passwordForm.reset()
  }
  ngOnInit(): void {
    this.userAccountService.getCurrentUser().subscribe(value => this.user = value)
  }

}

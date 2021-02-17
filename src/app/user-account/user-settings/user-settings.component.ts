import { Component, OnInit } from '@angular/core';
import {UserAccountService} from "../services/user-account.service";
import {User} from "../../user/models/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user: User;
  form: FormGroup;
  image: FormControl = new FormControl('')
  first_name: FormControl = new FormControl('')
  last_name: FormControl = new FormControl('')
  email: FormControl = new FormControl('', [Validators.email])
  phone: FormControl = new FormControl('')
  constructor(private userAccountService: UserAccountService) {
    this.form = new FormGroup({
      image: this.image,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone
    })
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
  ngOnInit(): void {
    this.userAccountService.getCurrentUser().subscribe(value => this.user = value)
  }

}

import { Component, OnInit } from '@angular/core';
import {Message} from "../models/Message";
import {UserAccountService} from "../services/user-account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../user/models/User";
import {UserService} from "../../user/services/user.service";

@Component({
  selector: 'app-user-messenger',
  templateUrl: './user-messenger.component.html',
  styleUrls: ['./user-messenger.component.css']
})
export class UserMessengerComponent implements OnInit {
  user: User;
  users: User[];
  messages: Message[];
  receiver_id: number;
  activeChat: Message[];
  form: FormGroup;
  body: FormControl = new FormControl('', [Validators.required])
  image: FormControl = new FormControl('');
  constructor(private userAccountService: UserAccountService, private userService: UserService) {
    this.form = new FormGroup({
      body: this.body,
      image: this.image
    })
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(value => this.users = value)
    this.userAccountService.getUserMessages().subscribe(value => this.messages = value)
    this.userAccountService.getCurrentUser().subscribe(value => this.user = value)
    if (this.receiver_id){
      this.userAccountService.getUserChat(this.receiver_id).subscribe(messages=> this.activeChat = messages.sort(function(message1, message2){
      if(message1.id < message2.id){
        return -1;
      }
      if(message1.id > message2.id){
        return 1;
      }
    }))
    }
  }
  toChat(id){
    this.receiver_id = id
    this.ngOnInit()
  }
  onFileUpload(event: any) {
    const[file] = event.target.files;
    this.form.patchValue({image:file})
  }
  send(form: FormGroup): void{
    const formData = new FormData();
    console.log(form.get('image').value);
    formData.set('receiver', `${this.receiver_id}`);
    formData.set('body', form.controls.body.value);
    if(form.get('image').value){
      formData.set('image', form.get('image').value)
    }
    form.reset()
    this.userAccountService.sendMessage(formData).subscribe(value=> this.ngOnInit());
  }
}

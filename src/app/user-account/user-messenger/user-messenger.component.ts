import { Component, OnInit } from '@angular/core';
import {Message} from "../models/Message";
import {UserAccountService} from "../services/user-account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../user/models/User";

@Component({
  selector: 'app-user-messenger',
  templateUrl: './user-messenger.component.html',
  styleUrls: ['./user-messenger.component.css']
})
export class UserMessengerComponent implements OnInit {
  user: User;
  messages: Message[];
  chats: any;
  activeChat: Message[];
  form: FormGroup;
  body: FormControl = new FormControl('', [Validators.required])
  image: FormControl = new FormControl('');
  constructor(private userAccountService: UserAccountService) {
    this.form = new FormGroup({
      body: this.body,
      image: this.image
    })
  }

  ngOnInit(): void {
    this.userAccountService.getUserMessages().subscribe(value => this.messages = value)
    this.userAccountService.getUserMessages().subscribe(messages => this.userAccountService.getCurrentUser()
      .subscribe(user => this.chats = new Set(messages.map(message=> message.sender_name)
        .filter(value=> value !== user.username  ))))
    this.userAccountService.getCurrentUser().subscribe(value => this.user = value)
  }

  toChat(chat){
    this.activeChat = this.messages.filter(message=> message.sender_name === chat)
    let receiver_id = this.activeChat[0].sender
    for (let message of this.messages){
      if(message.sender === this.user.id && message.receiver === receiver_id){
        this.activeChat.push(message)
      }
    }
  }
  onFileUpload(event: any) {
    const[file] = event.target.files;
    this.form.patchValue({image:file})
  }
  send(form: FormGroup): void{
    const formData = new FormData();
    let receiver: number= null;
    for (let message of this.activeChat){
      console.log(message);
      if (message.sender === this.user.id){
        receiver = message.receiver
      }
      else{
        receiver = message.sender
      }
    }
    console.log(receiver);
    formData.set('image', form.get('image').value);
    formData.set('receiver', `${receiver}`);
    formData.set('body', form.controls.body.value);
    form.reset()
    this.userAccountService.sendMessage(formData).subscribe(value=> this.ngOnInit());
  }
}

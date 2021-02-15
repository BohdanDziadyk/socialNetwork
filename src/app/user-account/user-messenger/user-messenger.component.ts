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
  receiver_id: number;
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

  toChat(chat){
    this.activeChat = this.messages.filter(message=> message.sender_name === chat)
    this.receiver_id = this.activeChat[0].sender
    for (let message of this.messages){
      if(message.sender === this.user.id && message.receiver === this.receiver_id){
        this.activeChat.push(message)
      }
    }
    this.activeChat.sort(function(message1, message2){
      if(message1.id < message2.id){
        return -1;
      }
      if(message1.id > message2.id){
        return 1;
      }
    })
  }
  onFileUpload(event: any) {
    const[file] = event.target.files;
    this.form.patchValue({image:file})
  }
  send(form: FormGroup): void{
    const formData = new FormData();
    formData.set('receiver', `${this.receiver_id}`);
    formData.set('body', form.controls.body.value);
    formData.set('image', form.get('image').value);
    form.reset()
    this.userAccountService.sendMessage(formData).subscribe(value=> this.ngOnInit());
  }
}

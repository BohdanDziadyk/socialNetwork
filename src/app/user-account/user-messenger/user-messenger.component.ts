import { Component, OnInit } from '@angular/core';
import {Message} from "../models/Message";
import {UserAccountService} from "../services/user-account.service";

@Component({
  selector: 'app-user-messenger',
  templateUrl: './user-messenger.component.html',
  styleUrls: ['./user-messenger.component.css']
})
export class UserMessengerComponent implements OnInit {
  messages: Message[];
  chats:[];
  constructor(private userAccountService: UserAccountService) { }

  ngOnInit(): void {
    this.userAccountService.getUserMessages().subscribe(value => this.messages = value)
  }


}

import { Component, OnInit } from '@angular/core';
import {UserAccountService} from "../services/user-account.service";
import {User} from "../../user/models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  user: User;
  friends: User[];
  constructor(private userAccountService: UserAccountService, private router: Router) { }

  ngOnInit(): void {
    this.userAccountService.getCurrentUser().subscribe(value => this.user = value);
    this.userAccountService.getUserFriends().subscribe(value => this.friends = value);
  }

  toFriend(id) {
    this.router.navigate([`users/${id}`]);
  }
}

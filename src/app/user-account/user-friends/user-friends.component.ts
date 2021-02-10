import { Component, OnInit } from '@angular/core';
import {UserAccountService} from "../services/user-account.service";
import {User} from "../../user/models/User";
import {Router} from "@angular/router";
import {FriendRequest} from "../models/FriendRequest";
import {UserService} from "../../user/services/user.service";

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  user: User;
  friends: User[];
  friendRequests: FriendRequest[];
  requestStatus: boolean;
  constructor(private userAccountService: UserAccountService, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userAccountService.getCurrentUser().subscribe(value => this.user = value);
    this.userAccountService.getUserFriends().subscribe(value => this.friends = value);
    this.userAccountService.getUserFriendRequests().subscribe(value => this.friendRequests = value);
  }

  toFriend(id) {
    this.router.navigate([`users/${id}`]);
  }

  acceptFriendRequest(id) {
    this.userAccountService.acceptFriendRequest(id, status).subscribe(value => this.ngOnInit())
  }

  declineFriendRequest(id: number) {
    this.userAccountService.declineFriendRequest(id, status).subscribe(value => this.ngOnInit())
  }
}

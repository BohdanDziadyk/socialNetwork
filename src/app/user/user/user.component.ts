import {Component, Input, OnInit, Output} from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../post/services/post.service';
import {Post} from '../../post/models/Post';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../authorization/services/authorization.service";
import {UserAccountService} from "../../user-account/services/user-account.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  posts: Post[];
  @Input()
  currentUser:User;
  user: User;
  friendRequestResponse: string;
  friends: User[];
  isFriend: boolean;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private postService: PostService, private router:Router, private authorizationService: AuthorizationService, private userAccountService: UserAccountService) {
  }
  ngOnInit(): void {
    this.friendRequestResponse = null;
    this.userAccountService.getCurrentUser().subscribe(value => this.currentUser = value)
    this.activatedRoute.params.subscribe(value => this.userService.getUser(+value.id).subscribe(value1 => this.user = value1));
    this.activatedRoute.params.subscribe(value => this.postService.getPostsByUserId(value.id).subscribe(value1 => this.posts = value1));
    this.userAccountService.getUserFriends().subscribe(value => this.activatedRoute.params.subscribe(value1 => this.isFriend = value.some(value2 => value1.id == value2.id)));
  }
  isAuthorized(): boolean {
    return this.authorizationService.isAuthenticated()
  }
  toPost(id: number) : void{
    this.router.navigate([`posts/${id}`]);
  }

  sendFriendRequest(id) {
    this.userAccountService.sendFriendRequest(id,this.user).subscribe(value => this.friendRequestResponse = value);
  }

  deleteFriend(id) {
    this.userAccountService.deleteFriend(id, status).subscribe(value => this.ngOnInit())
  }
  blockUserAsAdmin(){
    this.userService.changeAccountStatusAsAdmin(this.user.id,{is_active: 0}).subscribe(value => this.ngOnInit())
  }
  unblockUserAsAdmin(){
    this.userService.changeAccountStatusAsAdmin(this.user.id,{is_active: 1}).subscribe(value => this.ngOnInit())
  }
}

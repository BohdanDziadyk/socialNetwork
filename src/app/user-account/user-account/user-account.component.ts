import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../post/models/Post";
import {User} from "../../user/models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user/services/user.service";
import {PostService} from "../../post/services/post.service";
import {UserAccountService} from "../services/user-account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
posts: Post[];
  @Input()
  user: User;
  form: FormGroup;
  title: FormControl = new FormControl('')
  body: FormControl = new FormControl('', [Validators.required])
  constructor(private activatedRoute: ActivatedRoute, private userAccountService: UserAccountService, private router:Router) {
    this.form = new FormGroup({
      title: this.title,
      body: this.body
    })
  }
  doPost(form: FormGroup): void{
    this.userAccountService.doPost(form.getRawValue()).subscribe();
    document.location.reload()
  }
  ngOnInit(): void {
      this.userAccountService.getCurrentUser().subscribe(value => this.user = value);
      this.userAccountService.getCurrentUserPosts().subscribe(value => this.posts = value);
  }

  toPost(id: number) : void{
    this.router.navigate([`posts/${id}`]);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../models/Post';
import {PostService} from '../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from "../../comment/services/comment.service";
import {Comment} from "../../comment/models/Comment";
import {UserService} from "../../user/services/user.service";
import {User} from "../../user/models/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  postUser: User;
  commentUser: User;
  post: Post;
  comments: Comment[];
  newComment: Comment;
  form: FormGroup;
  body: FormControl = new FormControl('', [Validators.required]);
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private postService: PostService,
              private commentService: CommentService) {
    this.activatedRoute.params.subscribe(value => this.postService.getPost(value.id).subscribe(value1 => this.post = value1));
    this.activatedRoute.params.subscribe(value => this.commentService.getCommentByPostId(value.id)
      .subscribe(value1 => this.comments = value1));
    this.form = new FormGroup({
      body: this.body
    })
  }
  doComment(form: FormGroup){
    this.postService.doComment({body: form.controls.body.value, post: this.post.id}).subscribe();
    // document.location.reload()
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => this.postService.getPost(value.id)
      .subscribe(value1 => this.userService.getUser(value1.user).subscribe(value2 => this.postUser = value2)));
    this.activatedRoute.params.subscribe(value => this.commentService.getComment(value.id)
      .subscribe(value1 => this.userService.getUser(value1.user).subscribe(value2 => this.commentUser = value2)));
  }

}

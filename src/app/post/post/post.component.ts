import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../models/Post';
import {PostService} from '../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from "../../comment/services/comment.service";
import {Comment} from "../../comment/models/Comment";
import {UserService} from "../../user/services/user.service";
import {User} from "../../user/models/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAccountService} from "../../user-account/services/user-account.service";

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
  commentEditFlag = false;
  comment: Comment;
  form: FormGroup;
  body: FormControl = new FormControl('', [Validators.required]);
  commentEditForm: FormGroup;
  editedCommentBody: FormControl = new FormControl('', [Validators.required]);

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private postService: PostService,
              private commentService: CommentService, private userAccountService: UserAccountService) {
    this.activatedRoute.params.subscribe(value => this.postService.getPost(value.id).subscribe(value1 => this.post = value1));
    this.activatedRoute.params.subscribe(value => this.commentService.getCommentByPostId(value.id)
      .subscribe(value1 => this.comments = value1));
    this.form = new FormGroup({
      body: this.body
    })
    this.commentEditForm = new FormGroup({
      editedCommentBody: this.editedCommentBody
      }
    )
  }

  doComment(form: FormGroup) {
    this.postService.doComment({body: form.controls.body.value, post: this.post.id}).subscribe();
    document.location.reload();
  }
  showCommentEditForm(): boolean{
    return this.commentEditFlag;
  }
  changeCommentEditFlag(comment):void{
    this.comment = comment;
    this.commentEditFlag = !this.commentEditFlag;
  }
  editComment(commentEditForm:FormGroup){
    this.userAccountService.editComment({body: commentEditForm.controls.editedCommentBody.value, post: this.post.id}, this.comment.id).subscribe()
    document.location.reload()
  }

  deleteComment(id){
    this.userAccountService.deleteComment(id).subscribe()
    document.location.reload()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => this.postService.getPost(value.id)
      .subscribe(value1 => this.userService.getUser(value1.user).subscribe(value2 => this.postUser = value2)));
    this.userAccountService.getCurrentUser().subscribe(value => this.commentUser = value);
  }

}

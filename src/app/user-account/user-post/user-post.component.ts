import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../user/models/User";
import {Post} from "../../post/models/Post";
import {Comment} from "../../comment/models/Comment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user/services/user.service";
import {PostService} from "../../post/services/post.service";
import {CommentService} from "../../comment/services/comment.service";
import {UserAccountService} from "../services/user-account.service";

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
@Input()
  postUser: User;
  commentUser: User;
  post: Post;
  comments: Comment[];
  comment: Comment;
  editFlag = false;
  commentEditFlag = false;
  editForm: FormGroup;
  title: FormControl = new FormControl('')
  body: FormControl = new FormControl('', [Validators.required]);
  form: FormGroup;
  commentBody: FormControl = new FormControl('', [Validators.required]);
  commentEditForm: FormGroup;
  editedCommentBody: FormControl = new FormControl('', [Validators.required]);
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private postService: PostService,
              private commentService: CommentService, private userAccountService: UserAccountService) {
    this.activatedRoute.params.subscribe(value => this.postService.getPost(value.id).subscribe(value1 => this.post = value1));
    this.activatedRoute.params.subscribe(value => this.commentService.getCommentByPostId(value.id)
      .subscribe(value1 => this.comments = value1));
    this.form = new FormGroup({
      commentBody: this.commentBody
    })
    this.editForm = new FormGroup({
      title: this.title,
      body: this.body
      }
    )
    this.commentEditForm = new FormGroup({
      editedCommentBody: this.editedCommentBody
      }
    )
  }
  doComment(form: FormGroup){
    this.postService.doComment({body: form.controls.commentBody.value, post: this.post.id}).subscribe();
    document.location.reload()
  }
  showEditForm(): boolean{
    return this.editFlag;
  }
  changeEditFlag():void{
    this.editFlag = !this.editFlag;
  }
  showCommentEditForm(): boolean{
    return this.commentEditFlag;
  }
  changeCommentEditFlag(comment):void{
    this.comment = comment;
    this.commentEditFlag = !this.commentEditFlag;
  }
  editPost(editForm: FormGroup, id){
   this.userAccountService.editPost(editForm.getRawValue(),id).subscribe()
   document.location.reload()
  }
  deletePost(id){
    this.userAccountService.deletePost(id).subscribe()
    this.router.navigate(['my_account'])
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
    this.activatedRoute.params.subscribe(value => this.userAccountService.getUserPost(value.id)
      .subscribe(value1 => this.userService.getUser(value1.user).subscribe(value2 => this.postUser = value2)));
    this.activatedRoute.params.subscribe(value => this.commentService.getComment(value.id)
      .subscribe(value1 => this.userService.getUser(value1.user).subscribe(value2 => this.commentUser = value2)));
  }
}

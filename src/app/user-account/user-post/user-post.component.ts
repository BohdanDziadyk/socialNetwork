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
  currentUser:User;
  post: Post;
  comments: Comment[];
  comment: Comment;
  editFlag = false;
  commentEditFlag = false;
  editForm: FormGroup;
  title: FormControl = new FormControl('')
  body: FormControl = new FormControl('', [Validators.required]);
  image: FormControl = new FormControl('')
  commentForm: FormGroup;
  commentBody: FormControl = new FormControl('', [Validators.required]);
  commentImage: FormControl = new FormControl('')
  commentEditForm: FormGroup;
  editedCommentBody: FormControl = new FormControl('', [Validators.required]);
  editedCommentImage: FormControl = new FormControl('')
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private postService: PostService,
              private commentService: CommentService, private userAccountService: UserAccountService) {
    this.commentForm = new FormGroup({
      commentBody: this.commentBody,
      commentImage: this.commentImage
    })
    this.editForm = new FormGroup({
        title: this.title,
        body: this.body,
        image: this.image
      }
    )
    this.commentEditForm = new FormGroup({
        editedCommentBody: this.editedCommentBody,
        editedCommentImage: this.editedCommentImage
      }
    )
  }

  doComment(commentForm: FormGroup) {
    const formData = new FormData();
    formData.set('image', commentForm.get('commentImage').value);
    formData.set('post', `${this.post.id}`);
    formData.set('body', commentForm.controls.commentBody.value);
    console.log(formData);
    commentForm.reset()
    this.postService.doComment(formData).subscribe(value => this.ngOnInit());
  }

  showEditForm(): boolean {
    return this.editFlag;
  }

  changeEditFlag(): void {
    this.editFlag = !this.editFlag;
  }

  showCommentEditForm(): boolean {
    return this.commentEditFlag;
  }

  changeCommentEditFlag(comment): void {
    this.comment = comment;
    this.commentEditFlag = !this.commentEditFlag;
  }

  editPost(editForm: FormGroup, id) {
    const formData = new FormData();
    Object.entries(editForm.value).forEach(([key, value]: any[]) => {
      if (key === 'image') {
        formData.set(key, editForm.get(key).value)
      } else {
        formData.set(key, value)
      }
    })
    editForm.reset()
    this.userAccountService.editPost(formData, id).subscribe(value => this.ngOnInit())
  }
  onFileUpload(event: any) {
    const [file] = event.target.files;
    this.editForm.patchValue({image: file})
  }

  deletePost(id) {
    this.userAccountService.deletePost(id).subscribe()
    this.router.navigate(['my_account']).then(value => document.location.reload())
  }

  editComment(commentEditForm: FormGroup) {
    const formData = new FormData();
    formData.set('image', commentEditForm.get('editedCommentImage').value);
    formData.set('post', `${this.post.id}`);
    formData.set('body', commentEditForm.controls.editedCommentBody.value);
    commentEditForm.reset()
    this.userAccountService.editComment(formData,this.comment.id).subscribe(value => this.ngOnInit())
  }

  deleteComment(id) {
    this.userAccountService.deleteComment(id).subscribe(value => this.ngOnInit())
  }

  ngOnInit(): void {
    this.userAccountService.getCurrentUser().subscribe(value => this.currentUser = value)
    this.activatedRoute.params.subscribe(value => this.postService.getPost(value.id).subscribe(value1 => this.post = value1));
    this.activatedRoute.params.subscribe(value => this.commentService.getCommentByPostId(value.id)
      .subscribe(value1 => this.comments = value1));
    this.activatedRoute.params.subscribe(value => this.userAccountService.getUserPost(value.id)
      .subscribe(value1 => this.userService.getUser(value1.user).subscribe(value2 => this.postUser = value2)));
    this.activatedRoute.params.subscribe(value => this.commentService.getComment(value.id)
      .subscribe(value1 => this.userService.getUser(value1.user).subscribe(value2 => this.commentUser = value2)));
    this.editFlag = false;
    this.commentEditFlag = false;
  }

  onCommentFileUpload(event: any) {
    const [file] = event.target.files;
    this.commentForm.patchValue({commentImage: file})
  }
  onEditCommentFileUpload(event: any){
    const [file] = event.target.files;
    this.commentEditForm.patchValue({editedCommentImage: file})
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../models/Post';
import {PostService} from '../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from "../../comment/services/comment.service";
import {Comment} from "../../comment/models/Comment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;
  comments: Comment[];
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) {
    this.activatedRoute.params.subscribe(value => this.postService.getPost(value.id).subscribe(value1 => this.post = value1));
    this.activatedRoute.params.subscribe(value => this.commentService.getCommentByPostId(value.id)
      .subscribe(value1 => this.comments = value1));
  }

  ngOnInit(): void {
  }

}

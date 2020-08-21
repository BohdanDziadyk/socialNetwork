import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../models/Comment';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: Comment;
  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService) {
    this.activatedRoute.params.subscribe(value => this.commentService.getComment(value.id).subscribe(value1 => this.comment = value1));
  }

  ngOnInit(): void {
  }

}

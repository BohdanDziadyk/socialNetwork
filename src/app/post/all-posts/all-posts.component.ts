import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../models/Post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Post[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }
  toPost(id: number) : void{
    this.router.navigate([`posts/${id}`]);
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => this.posts = value.fetchedPosts);
  }
}

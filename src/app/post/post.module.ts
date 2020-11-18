import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostComponent } from './post/post.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {PostResolveService} from './services/post-resolve.service';



@NgModule({
  declarations: [AllPostsComponent, PostComponent],
  imports: [
    CommonModule,
    //HttpClientModule,
    RouterModule.forChild([
      {path: '', component: AllPostsComponent, resolve: {fetchedPosts: PostResolveService}},
      {path: 'posts/:id', component: PostComponent}
      ])
  ]
})
export class PostModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { CommentComponent } from './comment/comment.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommentResolveService} from './services/comment-resolve.service';



@NgModule({
  declarations: [AllCommentsComponent, CommentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '', component: AllCommentsComponent, resolve: {fetchedComments: CommentResolveService}, children: [
          {path: ':id', component: CommentComponent}
        ]}
    ])
  ]
})
export class CommentModule { }

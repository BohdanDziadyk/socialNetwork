import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account/user-account.component';
import {RouterModule} from "@angular/router";
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserCommentsComponent } from './user-comments/user-comments.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UserAccountComponent, UserPostsComponent, UserCommentsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: UserAccountComponent},
            {path: 'posts', component: UserPostsComponent},
            {path: 'comments', component: UserCommentsComponent}
        ]),
        ReactiveFormsModule
    ]
})
export class UserAccountModule { }

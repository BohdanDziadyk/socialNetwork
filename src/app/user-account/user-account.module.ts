import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account/user-account.component';
import {RouterModule} from "@angular/router";
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserCommentsComponent } from './user-comments/user-comments.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserPostComponent } from './user-post/user-post.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';



@NgModule({
  declarations: [UserAccountComponent, UserPostsComponent, UserCommentsComponent, UserPostComponent, UserFriendsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: UserAccountComponent},
            {path: 'posts', component: UserPostsComponent},
            {path: "posts/:id", component:UserPostComponent},
            {path: 'comments', component: UserCommentsComponent},
            {path: 'friends', component: UserFriendsComponent}
        ]),
        ReactiveFormsModule
    ]
})
export class UserAccountModule { }

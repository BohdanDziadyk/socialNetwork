import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserComponent } from './user/user.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {UserResolveService} from './services/user-resolve.service';
import {PostComponent} from '../post/post/post.component';



@NgModule({
  declarations: [AllUsersComponent, UserComponent],
  imports: [
    CommonModule,
    //HttpClientModule,
    RouterModule.forChild([
      {path: '', component: AllUsersComponent, resolve: {fetchedUsers: UserResolveService}},
      {path: ':id', component: UserComponent},
      {path: 'posts/:id', component: PostComponent},
    ])
  ]
})
export class UserModule { }

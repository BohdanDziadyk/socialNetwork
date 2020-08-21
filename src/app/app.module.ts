import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'users', loadChildren : () => import('./user/user.module').then(m => m.UserModule)},
      {path: 'posts', loadChildren : () => import('./post/post.module').then(m => m.PostModule)},
      {path: 'comments', loadChildren : () => import('./comment/comment.module').then(m => m.CommentModule)}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

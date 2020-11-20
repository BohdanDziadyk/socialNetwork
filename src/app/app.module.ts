import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from "./app.interceptor";

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
      {path: 'comments', loadChildren : () => import('./comment/comment.module').then(m => m.CommentModule)},
      {path: 'auth', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)},
      {path: 'my_account', loadChildren:() => import('./user-account/user-account.module').then(m => m.UserAccountModule)}
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AppInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

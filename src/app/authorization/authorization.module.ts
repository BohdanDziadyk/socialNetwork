import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {RegisterComponent} from './register/register.component';


@NgModule({
  declarations: [LogInComponent, RegisterComponent],
  imports: [
    HttpClientModule,
    RouterModule.forChild([
      {path: 'login', component: LogInComponent},
      {path: 'registration', component: RegisterComponent}
    ]),
    CommonModule
  ]
})
export class AuthorizationModule {
}

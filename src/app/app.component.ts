import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthorizationService} from "./authorization/services/authorization.service";
import {Route, Router} from "@angular/router";
import {UserAccountService} from "./user-account/services/user-account.service";
import {User} from "./user/models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'socialNetwork';
  user: User;

  constructor(private authorizationService: AuthorizationService, private router: Router, private userAccountService: UserAccountService) {
  }
  ngOnInit() : void{
    this.userAccountService.getCurrentUser().subscribe(value => this.user = value)
  }
  isAuthorized(): boolean {
    return this.authorizationService.isAuthenticated()
  }

  logOut(): void {
    this.authorizationService.deleteTokens();
    this.router.navigate(['auth/login']);
  }
}

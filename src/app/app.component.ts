import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {AuthorizationService} from "./authorization/services/authorization.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialNetwork';

  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }

  isAuthorized(): boolean {
    return this.authorizationService.isAuthenticated()
  }

  logOut(): void {
    this.authorizationService.deleteTokens();
    this.router.navigate(['auth/login']);
  }
}

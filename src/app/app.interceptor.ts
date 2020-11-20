import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthorizationService} from "./authorization/services/authorization.service";
import {Router} from "@angular/router";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {TokensPair} from "./authorization/models/TokensPair";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthorized = this.authorizationService.isAuthenticated();
    if (this.isRefreshing){
      request = this.addToken(request, this.authorizationService.getRefreshToken());
    }
    else if(isAuthorized){
      request = this.addToken(request, this.authorizationService.getAccessToken());
    }
    return next.handle(request).pipe(catchError((responseError: HttpErrorResponse)=>{
      if(responseError && responseError.error){
        if (responseError instanceof HttpErrorResponse && responseError.status === 401){
          return this.handle401(request, next)
        }
      }
      if(responseError.status === 400){
        this.isRefreshing = false;
        this.router.navigate(['auth/login'], {
          queryParams:{
            notAuthorized: true
          }
        })
      }
      if(responseError.status === 403){
        this.isRefreshing = false;
        this.router.navigate(['auth/login'], {
          queryParams:{
            sessionFailed: true
          }
        })
      }
    })) as any
  }
  addToken(request: HttpRequest<any>, token:string): HttpRequest<any>{
    return request.clone({setHeaders:{Authorization: `Bearer ${token}`}});
  }
  private handle401(request: HttpRequest<any>, next: HttpHandler): any{
    if (!this.isRefreshing){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authorizationService.refresh().pipe(
        switchMap((token: TokensPair)=> {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);
          return next.handle(this.addToken(request, token.access));
        })
      )
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => next.handle(this.addToken(request, jwt)))
    );
  }
}

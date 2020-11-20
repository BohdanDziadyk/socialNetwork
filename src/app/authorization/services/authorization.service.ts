import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, pipe} from "rxjs";
import {LogInPair} from "../models/LogInPair";
import {TokensPair} from "../models/TokensPair";
import {tap} from "rxjs/operators";
import {RegisterModel} from "../models/RegisterModel";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  URL = `http://localhost:8000/`;
  private accessTokenKey = 'access';
  private refreshTokenKey = 'refresh';
  constructor(private httpClient: HttpClient) {
  }
  logIn(user: LogInPair): Observable<TokensPair> {
    return this.httpClient.post<TokensPair>(`${this.URL}auth/`, user)
      .pipe(
        tap((tokens: TokensPair) => this.setTokens(tokens))
      );
  }
  register(user: RegisterModel): Observable<any>{
    return this.httpClient.post<RegisterModel>(`${this.URL}auth/register/`, user);
  }
  refresh(): Observable<TokensPair>{
    return this.httpClient.post<TokensPair>(`${this.URL}auth/refresh/`, {refresh: this.getRefreshToken()})
      .pipe(
        tap((tokens:TokensPair) => this.setTokens(tokens))
      );
  }
  private setAccessToken(access: string): void{
    localStorage.setItem(this.accessTokenKey, access);
  }
  private setRefreshToken(refresh: string): void{
    localStorage.setItem(this.refreshTokenKey, refresh);
  }
  getAccessToken(): string{
    return localStorage.getItem(this.accessTokenKey)
  }
  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey)
  }
  deleteTokens(): void{
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.accessTokenKey);
  }
  private setTokens(tokens: TokensPair){
    const {access, refresh} = tokens;
    this.setAccessToken(access);
    this.setRefreshToken(refresh);
  }
  public isAuthenticated(): boolean{
    return !!this.getAccessToken();
  }
}

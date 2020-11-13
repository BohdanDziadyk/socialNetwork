import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogInPair} from "../models/LogInPair";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  URL = `http://localhost:8000/users/`;
  constructor(private httpClient: HttpClient) {
  }
  logIn(logInPair: LogInPair): Observable<any>{
    return this.httpClient.post(this.URL, logInPair);
  }
}

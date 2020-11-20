import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../user/models/User";
import {Post} from "../../post/models/Post";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private httpClient: HttpClient) { }
  URL = `http://localhost:8000/user_account/`;
  getCurrentUser(): Observable<User>{
    return this.httpClient.get<User>(this.URL);
  }
  getCurrentUserPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.URL}posts`)
  }
}

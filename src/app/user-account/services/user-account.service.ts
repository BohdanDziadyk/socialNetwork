import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../user/models/User";
import {Post} from "../../post/models/Post";
import {Comment} from "../../comment/models/Comment";

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
    return this.httpClient.get<Post[]>(`${this.URL}posts`);
  }
  doPost(post: Post): Observable<Post>{
    return this.httpClient.post<Post>(`${this.URL}posts`, post);
  }
  postImage(fileData: File): Observable<any>{
    let formData = new FormData();
    formData.append('image', fileData, fileData.name);
    return this.httpClient.post<any>(`${this.URL}posts`, formData);
  }
  getUserPost(id): Observable<Post>{
    return this.httpClient.get<Post>(`${this.URL}posts/${id}`);
  }
  editPost(post: Post, id): Observable<Post>{
    return this.httpClient.patch<Post>(`${this.URL}posts/${id}`, post);
  }
  deletePost(id): Observable<Post>{
    return this.httpClient.delete<Post>(`${this.URL}posts/${id}`);
  }
  editComment(comment: Comment, id): Observable<Comment>{
    return this.httpClient.patch<Comment>(`${this.URL}comments/${id}`, comment);
  }
  deleteComment(id): Observable<Comment>{
    return this.httpClient.delete<Comment>(`${this.URL}comments/${id}`);
  }
}


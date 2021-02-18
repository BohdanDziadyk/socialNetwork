import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../user/models/User";
import {Post} from "../../post/models/Post";
import {Comment} from "../../comment/models/Comment";
import {FriendRequest} from "../models/FriendRequest";
import {Message} from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private httpClient: HttpClient) {
  }

  URL = `http://localhost:8000/user_account/`;

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(this.URL);
  }

  getCurrentUserPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.URL}posts`);
  }

  doPost(formData): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}posts`, formData);
  }

  getUserPost(id): Observable<Post> {
    return this.httpClient.get<Post>(`${this.URL}posts/${id}`);
  }

  editPost(formData, id): Observable<any> {
    return this.httpClient.patch<any>(`${this.URL}posts/${id}`, formData);
  }

  deletePost(id): Observable<Post> {
    return this.httpClient.delete<Post>(`${this.URL}posts/${id}`);
  }

  editComment(formData, id): Observable<any> {
    return this.httpClient.patch<any>(`${this.URL}comments/${id}`, formData);
  }

  deleteComment(id): Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.URL}comments/${id}`);
  }

  getUserFriends(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL}friends`);
  }

  sendFriendRequest(id, body): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}friends/send_friend_request/${id}`, body)
  }

  getUserFriendRequests(): Observable<FriendRequest[]> {
    return this.httpClient.get<FriendRequest[]>(`${this.URL}friends/requests`)
  }

  acceptFriendRequest(id: any, status: string): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}friends/accept_friend_request/${id}`, status)
  }

  declineFriendRequest(id: number, status: string): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}friends/deny_friend_request/${id}`, status)
  }

  deleteFriend(id: any, status: string): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}friends/delete/${id}`, status)
  }

  getUserMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.URL}messages`)
  }
  getUserChat(id): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.URL}messages/chat/${id}`)
  }
  sendMessage(formData): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}messages`, formData)
  }
  changeAccount(formData, id): Observable<any>{
    return this.httpClient.patch<any>(`${this.URL}${id}`, formData)
  }
  changePassword(body,id): Observable<any>{
    return this.httpClient.patch<any>(`${this.URL}password_change/${id}`, body)
  }
}

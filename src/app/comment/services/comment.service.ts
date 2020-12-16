import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  URL = `http://localhost:8000/comments/`;
  constructor(private httpClient: HttpClient) {
  }

  getAllComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.URL);
  }

  getComment(id: number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.URL}${id}`);
  }

  getCommentByPostId(id): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.URL}?post=${id}`);
  }
}


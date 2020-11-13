import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[];
  URL = `http://localhost:8000/posts/`;
  constructor(private httpClient: HttpClient) {
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.URL);
  }

  getPost(id): Observable<Post> {
    return this.httpClient.get<Post>(`${this.URL}${id}`);
  }

  getPostsByUserId(id): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.URL}?user=${id}`);
  }
}


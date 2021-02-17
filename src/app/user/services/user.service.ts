import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = `http://localhost:8000/users/`;
  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.URL);
  }
  getUser(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.URL}${id}`);
  }
  changeAccountStatusAsAdmin(id, value):Observable<User>{
    return this.httpClient.patch<User>(`${this.URL}${id}`,value)
  }
}

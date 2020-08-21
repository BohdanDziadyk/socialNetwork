import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Comment} from '../models/Comment';
import {CommentService} from './comment.service';

@Injectable({
  providedIn: 'root'
})
export class CommentResolveService implements Resolve<Comment[]>{

  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comment[]> | Promise<Comment[]> | Comment[] {
    return this.commentService.getAllComments();
  }
}


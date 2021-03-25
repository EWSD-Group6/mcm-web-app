import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import {map, tap} from 'rxjs/operators';
import {Comment, createComment} from './comment.model';
import { CommentStore } from './comment.store';
import {CommentsApiService} from '../../api';
import {Observable} from 'rxjs/Observable';

@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(private commentStore: CommentStore,
              private commentApiService: CommentsApiService) {
  }


  get(contributionId, next): Observable<any> {
    return this.commentApiService.commentsGet(contributionId, 20, next).pipe(
      tap(x => this.commentStore.update({
        next: x.next,
      })),
      tap(x => this.commentStore.add(x.data.map(createComment)))
    );
  }

  add(comment: Comment) {
    this.commentStore.add(comment);
  }

  update(id, comment: Partial<Comment>) {
    this.commentStore.update(id, comment);
  }

  remove(id: ID) {
    this.commentStore.remove(id);
  }

}

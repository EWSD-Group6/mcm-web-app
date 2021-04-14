import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {tap} from 'rxjs/operators';
import {Comment, createComment} from './comment.model';
import {CommentStore} from './comment.store';
import {CommentCommentCreateReq, CommentsApiService} from '../../api';
import {Observable} from 'rxjs/Observable';

@Injectable()
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

  add(comment: CommentCommentCreateReq): Observable<any> {
    this.commentStore.setLoading(true);
    return this.commentApiService.commentsPost(comment).pipe(
      tap(x => this.commentStore.add(createComment(x)))
    );
  }

  update(id, comment: Partial<Comment>): void {
    this.commentStore.update(id, comment);
  }

  remove(id: ID): void {
    this.commentStore.remove(id);
  }

}

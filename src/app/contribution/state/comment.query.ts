import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CommentStore, CommentState } from './comment.store';

@Injectable()
export class CommentQuery extends QueryEntity<CommentState> {

  constructor(protected store: CommentStore) {
    super(store);
  }

}

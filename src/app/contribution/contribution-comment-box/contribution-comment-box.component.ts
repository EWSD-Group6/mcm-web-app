import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentQuery} from '../state/comment.query';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../state/comment.model';
import {ContributionQuery} from '../state/contribution.query';
import {filter, switchMap} from 'rxjs/operators';
import {CommentService} from '../state/comment.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contribution-comment-box',
  templateUrl: './contribution-comment-box.component.html',
  styleUrls: ['./contribution-comment-box.component.scss']
})
export class ContributionCommentBoxComponent implements OnInit, OnDestroy {

  comment$: Observable<Comment[]>;
  subscription: Subscription;

  constructor(private query: CommentQuery,
              private contributionQuery: ContributionQuery,
              private service: CommentService) {
    this.comment$ = this.query.selectAll();
    this.subscription = this.contributionQuery.selectActiveId().pipe(
      filter(x => !!x),
      switchMap(x => this.service.get(x, null))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

}

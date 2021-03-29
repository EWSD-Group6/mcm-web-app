import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentQuery} from '../state/comment.query';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../state/comment.model';
import {ContributionQuery} from '../state/contribution.query';
import {filter, switchMap, take} from 'rxjs/operators';
import {CommentService} from '../state/comment.service';
import {Subscription} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {formatDistanceToNow} from 'date-fns';

@Component({
  selector: 'app-contribution-comment-box',
  templateUrl: './contribution-comment-box.component.html',
  styleUrls: ['./contribution-comment-box.component.scss']
})
export class ContributionCommentBoxComponent implements OnInit, OnDestroy {

  comment$: Observable<Comment[]>;
  subscription: Subscription;
  commentControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

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

  createComment(): void {
    if (this.commentControl.valid) {
      this.contributionQuery.selectActiveId().pipe(
        take(1),
        switchMap(id => this.service.add({
          contributionId: id,
          content: this.commentControl.value,
        })),
      ).subscribe(
        () => this.commentControl.reset()
      );
    }
  }

  toNow(createdAt: string): string {
    return formatDistanceToNow(new Date(createdAt), {includeSeconds: true, addSuffix: true});
  }
}

import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contribution} from '../state/contribution.model';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {ContributionService} from '../state/contribution.service';
import {Observable} from 'rxjs/Observable';
import {ArticleArticleRes, ContributionImageRes} from '../../api';
import {Subscription} from 'rxjs';
import {ContributionQuery} from '../state/contribution.query';

@Component({
  selector: 'app-contribution-detail',
  templateUrl: './contribution-detail.component.html',
  styleUrls: ['./contribution-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContributionDetailComponent implements OnInit, OnDestroy {
  commentVisible = false;
  contribution: Contribution;
  images$: Observable<ContributionImageRes[]>;
  article$: Observable<ArticleArticleRes>;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private service: ContributionService,
              private query: ContributionQuery) {
    this.sub = this.route.paramMap.pipe(
      map(x => Number(x.get('id'))),
      switchMap(id => this.service.getById(id)),
      tap(x => this.service.setActive(x.id)),
      tap(x => this.service.getImages(x.id)),
      tap(x => this.service.getArticle(x.id)),
    ).subscribe(
      x => this.contribution = x
    );
    this.images$ = this.query.select(x => x.images);
    this.article$ = this.query.select(x => x.article).pipe(
      filter(x => !!x),
      map(x => {
        x.versions.forEach(version => version.linkPdfCdn = encodeURIComponent(version.linkPdfCdn));
        return x;
      })
    );
  }

  ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

  ngOnInit(): void {
  }

}

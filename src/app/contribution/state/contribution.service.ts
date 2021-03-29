import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {finalize, map, switchMap, take, tap} from 'rxjs/operators';
import {Contribution, createContribution} from './contribution.model';
import {ContributionStore} from './contribution.store';
import {
  ArticlesApiService,
  ContributionContributionCreateReq,
  ContributionContributionUpdateReq,
  ContributionsApiService
} from '../../api';
import {ContributionQuery} from './contribution.query';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable({providedIn: 'root'})
export class ContributionService {

  constructor(private contributionStore: ContributionStore,
              private contributionApiService: ContributionsApiService,
              private query: ContributionQuery,
              private articleApiService: ArticlesApiService,
              private nzNotification: NzNotificationService) {
  }


  get(): Observable<any> {
    this.contributionStore.setLoading(true);
    return this.query.select(x => x.query).pipe(
      take(1),
      switchMap(query => this.contributionApiService.contributionsGet(
        query.contributionSessionId,
        query.facultyId,
        query.limit,
        query.page,
        query.status,
        query.studentId,
      )),
      tap(x => this.contributionStore.set(x.data.map(item => createContribution(item)))),
      tap(x => this.contributionStore.update({
        paginate: {
          total: x.total,
          pageIndex: x.currentPage + 1,
          pageSize: x.perPage,
        }
      })),
      finalize(() => this.contributionStore.setLoading(false)),
    );
  }

  add(contribution: ContributionContributionCreateReq): Observable<any> {
    return this.contributionApiService.contributionsPost(contribution).pipe(
      tap(x => this.contributionStore.add(createContribution(x)))
    );
  }

  update(id, req: ContributionContributionUpdateReq): Observable<any> {
    return this.contributionApiService.contributionsIdPut(id, req).pipe(
      tap(x => this.contributionStore.update(id, createContribution(x)))
    );
  }

  remove(id: number): void {
    this.contributionApiService.contributionsIdDelete(id).pipe(
      tap(() => this.contributionStore.remove(id)),
      tap(() => this.nzNotification.success('Delete contribution', `Contribution #${id} deleted`)),
    ).subscribe();
  }

  updateQuery(param: {
    contributionSessionId?: number;
    facultyId?: number;
    limit?: number;
    page?: number;
    status?: 'accepted' | 'rejected' | 'reviewing';
    studentId?: number;
  }): void {
    this.contributionStore.update(x => ({
      query: {
        ...x.query,
        ...param,
      }
    }));
    this.get().subscribe();
  }

  getById(id: number): Observable<Contribution> {
    const entity = this.query.getEntity(id);
    if (entity) {
      return of(entity);
    }
    return this.contributionApiService.contributionsIdGet(id).pipe(
      map(x => createContribution(x)),
      tap(x => this.contributionStore.add(x)),
    );
  }

  setActive(id): void {
    this.contributionStore.setActive(id);
  }

  getImages(contributionId): void {
    this.contributionApiService.contributionsIdImagesGet(contributionId).pipe(
      tap(x => this.contributionStore.update({
        images: x
      }))
    ).subscribe();
  }

  getArticle(articleId): void {
    this.articleApiService.articlesIdGet(articleId).pipe(
      tap(x => {
        x.versions.forEach(version => {
          if (version.linkPdfCdn) {
            version.linkPdfCdn = encodeURIComponent(version.linkPdfCdn);
          }
        });
        this.contributionStore.update({
          article: x
        });
      })
    ).subscribe();
  }

  updateStatus(id: number, status: any): Observable<any> {
    return this.contributionApiService.contributionsIdStatusPost(id, {
      status,
    }).pipe(
      tap(() => this.nzNotification.success('Contribution', `Update contribution #${id}, status -> ${status}`))
    );
  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContributionIndexComponent} from './contribution-index/contribution-index.component';
import {RouterModule} from '@angular/router';
import {CreateComponent} from './contribution-create/create.component';
import {ContributionDetailComponent} from './contribution-detail/contribution-detail.component';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzTimelineModule} from 'ng-zorro-antd/timeline';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {ContributionEditComponent} from './contribution-edit/contribution-edit.component';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ReactiveFormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {ContributionCommentBoxComponent} from './contribution-comment-box/contribution-comment-box.component';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzBadgeModule} from 'ng-zorro-antd/badge';


@NgModule({
  declarations: [
    ContributionIndexComponent,
    CreateComponent,
    ContributionDetailComponent,
    ContributionEditComponent,
    ContributionCommentBoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'index'},
      {
        path: 'index', component: ContributionIndexComponent, data: {
          breadcrumb: 'Index'
        }
      },
      {
        path: 'create', component: CreateComponent, data: {
          breadcrumb: 'Create New Contribution'
        }
      },
      {
        path: ':id/edit', component: ContributionEditComponent, data: {
          breadcrumb: 'Edit Contribution'
        }
      },
      {
        path: ':id', component: ContributionDetailComponent, data: {
          breadcrumb: 'Detail'
        }
      },
    ]),
    PdfJsViewerModule,
    ReactiveFormsModule,
    NzGridModule,
    NzImageModule,
    NzDividerModule,
    NzCommentModule,
    NzAvatarModule,
    NzToolTipModule,
    NzIconModule,
    NzTabsModule,
    NzTimelineModule,
    NzDrawerModule,
    NzButtonModule,
    NzInputModule,
    NzUploadModule,
    NzModalModule,
    NzMessageModule,
    NzFormModule,
    NzTableModule,
    NzEmptyModule,
    NzDescriptionsModule,
    NzBadgeModule,
  ],
  exports: [RouterModule],
})
export class ContributionModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContributionIndexComponent} from './contribution-index/contribution-index.component';
import {RouterModule} from '@angular/router';
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
import { ContributionCreateComponent } from './contribution-create/contribution-create.component';
import {SharedModule} from '../shared/shared.module';
import {NzCardModule} from 'ng-zorro-antd/card';
import { ContributionStatusComponent } from './contribution-status/contribution-status.component';
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";


@NgModule({
  declarations: [
    ContributionIndexComponent,
    ContributionDetailComponent,
    ContributionCommentBoxComponent,
    ContributionCreateComponent,
    ContributionStatusComponent,
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
        path: 'create', component: ContributionCreateComponent, data: {
          breadcrumb: 'Create New Contribution'
        }
      },
      {
        path: ':id/edit', component: ContributionCreateComponent, data: {
          breadcrumb: 'Edit Contribution',
          isEdit: true,
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
    NzPopconfirmModule,

    SharedModule,
    NzCardModule,
    NzSpaceModule,
    NzSelectModule,
  ],
  exports: [RouterModule],
})
export class ContributionModule {
}

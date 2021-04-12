import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TermAndConditionEditComponent} from './term-and-condition-edit/term-and-condition-edit.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'term-and-condition'
  },
  {
    path: 'term-and-condition', component: TermAndConditionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}

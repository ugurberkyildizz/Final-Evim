import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: 'userform',
    component: UserFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: "Bilgilerim",
      breadcrumb: "Kullanıcı"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

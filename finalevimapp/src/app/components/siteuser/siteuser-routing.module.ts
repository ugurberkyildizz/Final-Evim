import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userform/:id',
        component: UserFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Kullanıcı Formu",
          breadcrumb: "Kullanıcı Yönetimi"
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Kullanıcılar",
          breadcrumb: "Liste"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteuserRoutingModule { }

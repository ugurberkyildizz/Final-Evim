import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { UsersComponent } from './users/users.component';
import { UsercompaniesComponent } from './usercompanies/usercompanies.component';
import { UserCompanyFormComponent } from './usercompany-form/usercompany-form.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile/:id',
        component: UsersProfileComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Kullanıcı Detayları",
          breadcrumb: "Profil"
        }
      },
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
        path: 'permissions',
        component: PermissionsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Yetkiler",
          breadcrumb: "Yetki Tanımı"
        }
      },
      {
        path: 'permissionform/:id',
        component: PermissionFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Yetki Formu",
          breadcrumb: "Kullanıcı Yetkili Sayfaları"
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
      },
      {
        path: 'usercompanies',
        component: UsercompaniesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Şubeler",
          breadcrumb: "Liste"
        }
      },
      {
        path: 'usercompanyform/:id',
        component: UserCompanyFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Firma Düzenle",
          breadcrumb: "Form"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersettingRoutingModule { }

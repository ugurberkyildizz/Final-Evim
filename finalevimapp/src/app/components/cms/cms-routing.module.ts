import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageFormComponent } from './page-form/page-form.component';
import { PagesComponent } from './pages/pages.component';

import { ContentFormComponent } from './content-form/content-form.component';
import { ContentsComponent } from './contents/contents.component';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories/categories.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pageform/:id',
        component: PageFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Sayfa Formu",
          breadcrumb: "Sayfa Yönetimi"
        }
      },
      {
        path: 'pages',
        component: PagesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Sayfalar",
          breadcrumb: "Liste"
        }
      }
      ,
      {
        path: 'contents',
        component: ContentsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "İçerikler",
          breadcrumb: "Liste"
        }
      },
      {
        path: 'contentform/:id',
        component: ContentFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "İçerik Formu",
          breadcrumb: "İçerik Yönetimi"
        }
      }
      ,
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "İçerik Kategorileri",
          breadcrumb: "İçerik Yönetimi"
        }
      },
      {
        path: 'categoryform/:id',
        component: CategoryFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "İçerik Kategori Formu",
          breadcrumb: "İçerik Yönetimi"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMSRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPreviewComponent } from './product-preview/product-preview.component';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products/products.component';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories/categories.component';

import { BrandFormComponent } from './brand-form/brand-form.component';
import { BrandsComponent } from './brands/brands.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'productform/:id/:company',
        component: ProductFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ürün Formu",
          breadcrumb: "Ürün Yönetimi"
        }
      },
      {
        path: 'productpreview/:id',
        component: ProductPreviewComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ürün Önizleme",
          breadcrumb: "Ürün Yönetimi"
        }
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ürünler",
          breadcrumb: "Ürün Yönetimi"
        }
      }
      ,
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ürün Kategorileri",
          breadcrumb: "Ürün Yönetimi"
        }
      },
      {
        path: 'categoryform/:id',
        component: CategoryFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ürün Kategori Formu",
          breadcrumb: "Ürün Yönetimi"
        }
      }
      ,
      {
        path: 'brands',
        component: BrandsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ürün Markaları",
          breadcrumb: "Ürün Yönetimi"
        }
      },
      {
        path: 'brandform/:id',
        component: BrandFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ürün Marka Formu",
          breadcrumb: "Ürün Yönetimi"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

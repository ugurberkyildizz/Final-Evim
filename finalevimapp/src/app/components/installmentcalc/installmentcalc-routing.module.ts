import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* import { ProductPreviewComponent } from './product-preview/product-preview.component';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products/products.component';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories/categories.component';

import { BrandFormComponent } from './brand-form/brand-form.component';
import { BrandsComponent } from './brands/brands.component'; */
import { calculateformComponent } from './calculateform/calculateform.component';
import { calculateviewComponent } from './calculateview/calculateview.component';
import { CalculatesComponent } from './calculates/calculates.component';
import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: 'calculates',
    component: CalculatesComponent,
    canActivate: [AdminGuard],
    data: {
      title: "Hesaplamalar",
      breadcrumb: "Hesaplamalar"
    }
  },
  {
    path: 'calculateview/:id',
    component: calculateviewComponent,
    canActivate: [AdminGuard],
    data: {
      title: "Görüntüleme",
      breadcrumb: "Görüntüleme"
    }
  }, 
  {
    path: 'calculateform/:id',
    component: calculateformComponent,
    canActivate: [AdminGuard],
    data: {
      title: "Hesaplama",
      breadcrumb: "Hesaplama"
    }
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallmentCalcRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleFormComponent } from './sale-form/sale-form.component';
import { SalesComponent } from './sales/sales.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'saleform/:id',
        component: SaleFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Satış Formu",
          breadcrumb: "Satış Yönetimi"
        }
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Satışlar",
          breadcrumb: "Satış Yönetimi"
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

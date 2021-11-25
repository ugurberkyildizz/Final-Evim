import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryreportComponent } from './summaryreport/summaryreport.component';

import { ProductreportComponent } from './productreport/productreport.component';

import { OrdersreportComponent } from './ordersreport/ordersreport.component';

import { MissingdatareportComponent } from './missingdatareport/missingdatareport.component';



import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'summaryreport',
        component: SummaryreportComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Müşteri Raporu",
          breadcrumb: "Raporlar"
        }
      },
      {
      path: 'productreport',
      component: ProductreportComponent,
      canActivate: [AdminGuard],
      data: {
        title: "Ürün Raporu",
        breadcrumb: "Raporlar"
      }
    },
    {
    path: 'ordersreport',
    component: OrdersreportComponent,
    canActivate: [AdminGuard],
    data: {
      title: "Sipariş Raporu",
      breadcrumb: "Raporlar"
    }
  },
  {
  path: 'missingdatareport',
  component: MissingdatareportComponent,
  canActivate: [AdminGuard],
  data: {
    title: "Veri Giriş Raporu",
    breadcrumb: "Raporlar"
  }
}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }

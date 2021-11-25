import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { LMSComponent } from './lms/lms.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

/** Ogrenci girisinde component:X ile admin girisinde component:W farklı */

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    canActivate: [AdminGuard],
    data: {
      title: "Durum",
      breadcrumb: "Durum"
    }
  }
];

/*const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StudentComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Durum",
          breadcrumb: "Durum"
        }
      }
      //,{ path: 'lms', component: LMSComponent, data: { title: "Durum", breadcrumb: "Durum" } }
    ]
  }
];*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

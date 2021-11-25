import { Routes } from '@angular/router';

var pozitifcube_routes = [
  {
  path: '',
  loadChildren: './components/dashboard/dashboard.module#DashboardModule',
  data: {
    breadcrumb: "Anasayfa"
  }
},
{
  path: 'cms',
  loadChildren: './components/cms/cms.module#CMSModule',
  data: {
    breadcrumb: "İçerik"
  }
},
{
  path: 'product',
  loadChildren: './components/product/product.module#ProductModule',
  data: {
    breadcrumb: "İçerik"
  }
},
{
  path: 'orders',
  loadChildren: './components/orders/orders.module#OrdersModule',
  data: {
    breadcrumb: "Satışlar"
  }
},
{
  path: 'param',
  loadChildren: './components/param/param.module#ParamModule',
  data: {
    breadcrumb: "Parametre"
  }
},
  {
  path: 'usersetting',
  loadChildren: './components/usersetting/usersetting.module#UsersettingModule',
  data: {
    breadcrumb: "Kullanıcı"
  }
  
},
{
path: 'siteuser',
loadChildren: './components/siteuser/siteuser.module#SiteuserModule',
data: {
  breadcrumb: "Site Kullanıcıları"
}

},
{
path: 'report',
loadChildren: './components/report/report.module#ReportModule',
data: {
  breadcrumb: "Raporlar"
}
},
{
  path: 'profile',
  loadChildren: './components/profile/profile.module#ProfileModule',
  data: {
    breadcrumb: "Profil"
  }
  },

{
  path: 'installmentcalc',
  loadChildren: './components/installmentcalc/installmentcalc.module#InstallmentCalcModule',
  data: {
    breadcrumb: "Taksit Hesaplama"
},

}
];

export const content: Routes = pozitifcube_routes;




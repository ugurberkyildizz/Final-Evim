import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupFormComponent } from './group-form/group-form.component';
import { GroupsComponent } from './groups/groups.component';
import { ParameterFormComponent } from './parameter-form/parameter-form.component';
import { ParametersComponent } from './parameters/parameters.component';
import { LanguagesComponent } from './languages/languages.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';

import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'groupform/:id',
        component: GroupFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Parametre Grup Formu",
          breadcrumb: "Parametre Grup Yönetimi"
        }
      },
      {
        path: 'parameterform/:id',
        component: ParameterFormComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Parametre Formu",
          breadcrumb: "Parametre Yönetimi"
        }
      },
      {
        path: 'parameters',
        component: ParametersComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Parametre Listesi",
          breadcrumb: "Parametreler"
        }
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Parametre Grup Listesi",
          breadcrumb: "Parametre Grupları"
        }
      },
      {
        path: 'languages',
        component: LanguagesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Diller",
          breadcrumb: "Sistem Dilleri"
        }
      },
      {
        path: 'currencies',
        component: CurrenciesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Para Birimleri",
          breadcrumb: "Sistem Para Birimleri"
        }
      },
      {
        path: 'countries',
        component: CountriesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Ülkeler",
          breadcrumb: "Ülke Listesi"
        }
      },
      {
        path: 'cities',
        component: CitiesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "Şehirler",
          breadcrumb: "Şehir Listesi"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxMaskModule } from 'ngx-mask';

import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParamRoutingModule } from './param-routing.module';

import { GroupFormComponent } from './group-form/group-form.component';
import { GroupsComponent } from './groups/groups.component';
import { ParameterFormComponent } from './parameter-form/parameter-form.component';
import { ParametersComponent } from './parameters/parameters.component';
import { LanguagesComponent } from './languages/languages.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [GroupsComponent, ParametersComponent , GroupFormComponent , 
                 ParameterFormComponent , LanguagesComponent,
                 CurrenciesComponent , CountriesComponent , CitiesComponent
                ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ParamRoutingModule,
    CountToModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    GalleryModule.forRoot(),
    NgxMaskModule.forRoot(),
    HttpClientModule,
    HttpModule,
    Ng5SliderModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ]
})
export class ParamModule { }

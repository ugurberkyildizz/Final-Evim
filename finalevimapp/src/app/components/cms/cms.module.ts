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
import { NgxEditorModule } from 'ngx-editor';

import { CMSRoutingModule } from './cms-routing.module';

import { PageFormComponent } from './page-form/page-form.component';
import { PagesComponent } from './pages/pages.component';

import { ContentFormComponent } from './content-form/content-form.component';
import { ContentsComponent } from './contents/contents.component';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories/categories.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PageFormComponent , PagesComponent,ContentFormComponent,ContentsComponent  , CategoryFormComponent , CategoriesComponent],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CMSRoutingModule,
    CountToModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    GalleryModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxEditorModule,
    HttpClientModule,
    HttpModule,
    Ng5SliderModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxLoadingModule.forRoot({
      /* animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(255,255,255,0.5)', 
      backdropBorderRadius: '0',
      primaryColour: '#4580d0', 
      secondaryColour: '#2e6fc9', 
      tertiaryColour: '#1d64c5' */
  })
  ]
})
export class CMSModule { }

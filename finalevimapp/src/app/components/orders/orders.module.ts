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
import { DragulaModule } from 'ng2-dragula';

import {NgxPrintModule} from 'ngx-print';

import { OrdersRoutingModule } from './orders-routing.module';

import { SaleFormComponent } from './sale-form/sale-form.component';
import { SalesComponent } from './sales/sales.component';


import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  declarations: [ SaleFormComponent , SalesComponent ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OrdersRoutingModule,
    CountToModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    GalleryModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxEditorModule,
    HttpClientModule,
    FileUploadModule,
    HttpModule,
    Ng5SliderModule,
    NgxPrintModule,
    Ng2SearchPipeModule,
    DragulaModule.forRoot(),
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
export class OrdersModule { }

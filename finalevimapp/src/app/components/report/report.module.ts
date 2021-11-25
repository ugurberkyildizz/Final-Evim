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

import { ReportRoutingModule } from './report-routing.module';

import { SummaryreportComponent } from './summaryreport/summaryreport.component';
import { ProductreportComponent } from './productreport/productreport.component';
import { OrdersreportComponent } from './ordersreport/ordersreport.component';
import { MissingdatareportComponent } from './missingdatareport/missingdatareport.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';


import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
registerLocaleData(localeTr);

import { MatRangeNativeDateModule , MatRangeDatepickerModule } from 'mat-range-datepicker';  
import {  MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';  

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE} from '@angular/material/core';

import { ExportAsModule } from 'ngx-export-as';

@NgModule({
  declarations: [ SummaryreportComponent , ProductreportComponent , OrdersreportComponent , MissingdatareportComponent ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReportRoutingModule,
    CountToModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    ExportAsModule,
    GalleryModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxEditorModule,
    HttpClientModule,
    FileUploadModule,
    HttpModule,
    Ng5SliderModule,
    NgxPrintModule,
    Ng2SearchPipeModule,
    MatRangeDatepickerModule,
    MatRangeNativeDateModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
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
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'}
  ]
})
export class ReportModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SharedModule } from "../../shared/shared.module";
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxLoadingModule } from 'ngx-loading';


import { NgxMaskModule } from 'ngx-mask';

import { MatRangeNativeDateModule , MatRangeDatepickerModule } from 'mat-range-datepicker';  
import {  MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material'; 

import { NgSelectModule } from '@ng-select/ng-select';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    UserFormComponent 
  ],
  imports: [
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    NgxMaskModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    CountToModule,
    ProfileRoutingModule,
    NgxChartsModule,
    
    Ng2GoogleChartsModule,
    SharedModule,
    
    Ng2SmartTableModule,
    
    MatRangeDatepickerModule,
    MatRangeNativeDateModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
  ]
})
export class ProfileModule { }

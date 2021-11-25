import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from "../../shared/shared.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { LMSComponent } from './lms/lms.component';

@NgModule({
  declarations: [
    EcommerceComponent, 
    LMSComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    CountToModule,
    DashboardRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    Ng2SmartTableModule
  ]
})
export class DashboardModule { }

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
import { SiteuserRoutingModule } from './siteuser-routing.module';

import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserFormComponent , UsersComponent ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SiteuserRoutingModule,
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
export class SiteuserModule { }

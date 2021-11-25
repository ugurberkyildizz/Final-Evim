import { Component , ViewChild , ViewEncapsulation , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { PozitifcubeFileService } from '../../../shared/services/pozitifcube-file.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours , parse , format } from 'date-fns';

import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';

declare var require: any
const { listTimeZones } = require('timezone-support')
const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')

/* import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE} from '@angular/material/core';
 */
@Component({
  selector: 'app-missingdatareport',
  templateUrl: './missingdatareport.component.html',
  styleUrls: ['./missingdatareport.component.scss'],
  encapsulation: ViewEncapsulation.None
  /* providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'},
  ] */
})

export class MissingdatareportComponent implements OnInit , OnDestroy{

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('actionButtons', { static: true }) actionButtons : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;

  public tabledata : any[];
  public temp = [];
  public loading = null;
  public columns = [];
  public listsubscribes :any;
  
  scrollBarHorizontal = false;

  /* public topsearchForm: FormGroup;
  public searchErrorHandlers : {};
  startdateModel = new Date();
  finishdateModel = new Date(); */
  
  constructor( public router : Router , private pocu:PozitifcubeHttpService , private fb: FormBuilder , private pocufile:PozitifcubeFileService ) {

    this.scrollBarHorizontal = pocu.scrollBarHorizontal;

    // this.startdateModel.setDate( this.finishdateModel.getDate()-6 );

    this.loading = true;
    this.getReportList();
  }

  getReportList(){

    this.listsubscribes = this.pocu.getViewList({}).subscribe(data => {

      this.tabledata = data;
      this.temp = data;
      this.loading = false;
    });
  }

  /* topsearchButton(){

    if (this.topsearchForm.invalid) { return; }
    else{
      this.loading = true;
      this.getReportList();
    }

  } */

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  ngOnInit() {

    this.columns = [
      { prop: 'pcd' , name: 'Ürün Kodu', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'pnm' , name: 'Ürün Adı', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'trn' , name: 'Eksik Çeviri', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'ctg' , name: 'Kategori', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'col' , name: 'Renk Deseni', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'img' , name: 'Görsel Rengi', sortable: true, headerTemplate: this.hdrTpl}
      ];
    
  }

  exportExcel(){
    // this.pocufile.exportExcel('table-list' , 'anticors');
    this.pocufile.exportAsExcelFile( this.tabledata , 'product');
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function (d) {
      return (d.pcd+'').toLowerCase().indexOf(val) !== -1 || (d.cnm+'').toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tabledata = temp;
  }

  updateColFilter(event, prop) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function(d) {
      return (d[prop]+'').toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tabledata = temp;
  }

}

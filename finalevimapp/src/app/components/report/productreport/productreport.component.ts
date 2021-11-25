import { Component , ViewChild , ViewEncapsulation , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
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
  selector: 'app-productreport',
  templateUrl: './productreport.component.html',
  styleUrls: ['./productreport.component.scss'],
  encapsulation: ViewEncapsulation.None
  /* providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'},
  ] */
})

export class ProductreportComponent implements OnInit , OnDestroy{

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('actionButtons', { static: true }) actionButtons : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild("historyMoneyCell", { static: true }) historyMoneyCell: TemplateRef<any>;

  public tabledata : any[];
  public temp = [];
  public loading = null;
  public columns = [];
  public listsubscribes :any;
  
  scrollBarHorizontal = false;

  public topsearchForm: FormGroup;
  public searchErrorHandlers : {};
  startdateModel = new Date();
  finishdateModel = new Date();
  
  constructor( public router : Router , private pocu:PozitifcubeHttpService , private fb: FormBuilder ) {

    this.scrollBarHorizontal = pocu.scrollBarHorizontal;

    // this.startdateModel.setDate( this.finishdateModel.getDate()-6 );

    this.startdateModel.setMonth( this.finishdateModel.getMonth()-6 );
    
    this.searchErrorHandlers = {
      startdate: new FormControl('', [Validators.required]),
      finishdate: new FormControl('', [Validators.required])
    }
    this.topsearchForm = this.fb.group(this.searchErrorHandlers);

    this.loading = true;
    this.getReportList();
  }

  getReportList(){

    this.listsubscribes = this.pocu.getViewList({'startdate': this.startdateModel,'finishdate':this.finishdateModel}).subscribe(data => {

      this.tabledata = data;
      this.temp = data;
      this.loading = false;
    });
  }

  topsearchButton(){

    if (this.topsearchForm.invalid) { return; }
    else{
      this.loading = true;
      this.getReportList();
    }

  }

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  ngOnInit() {

    this.columns = [
      { prop: 'pcd' , name: 'Ürün Kodu', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'pnm' , name: 'Ürün Adı', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'tfc' , name: 'Seri Adedi', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'ttc' , name: 'Ürün Adedi', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'ttp' , name: 'Ürün Kazancı', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'tto' , name: 'Ortalama Kazanç', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell}
      ];
    
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

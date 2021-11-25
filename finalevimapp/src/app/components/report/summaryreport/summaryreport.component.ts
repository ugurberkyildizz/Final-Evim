import { Component , ViewChild , ViewEncapsulation , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { PozitifcubeFileService } from '../../../shared/services/pozitifcube-file.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours , parse , format } from 'date-fns';

import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Row } from 'ng2-smart-table/lib/data-set/row';

declare var require: any
const { listTimeZones } = require('timezone-support')
const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')

/* import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE} from '@angular/material/core';
 */
@Component({
  selector: 'app-summaryreport',
  templateUrl: './summaryreport.component.html',
  styleUrls: ['./summaryreport.component.scss'],
  encapsulation: ViewEncapsulation.None
  /* providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'},
  ] */
})

export class SummaryreportComponent implements OnInit , OnDestroy{

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('actionButtons', { static: true }) actionButtons : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild("historyMoneyCell", { static: true }) historyMoneyCell: TemplateRef<any>;
  @ViewChild('status', { static: true }) status : TemplateRef<any>;
  

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
  
  zaman: any;
  updatedate: any;
  constructor( public router : Router , private pocu:PozitifcubeHttpService , private pocufile: PozitifcubeFileService,  private fb: FormBuilder ) {

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
  excelDocument(){
    this.pocufile.exportAsExcelFile(this.tabledata , "ozet-raporu");
  }

  getReportList(){
    
    
    this.listsubscribes = this.pocu.getViewList({'startdate': this.startdateModel,'finishdate':this.finishdateModel}).subscribe(data => {

      var filtereddata:any = [];
      
      

        data.forEach(row => {
          if(row.offerstatus == 2){

            this.zaman = row.updatedate.split(" ");
            this.updatedate = this.zaman[0];
    
            filtereddata.push({
              
              "Müşteri Adı" : row.customername,
              "Sözleşme No": row.contractnumber,
              "Kullanıcı" : row.userfullname,
              "Tarih": this.updatedate,
              "Durum": row.offerstatus,
              "Tö Toplam" : row.reportvalues.pinstop,
              "Tö 1 Ay" : row.firstmonthtotalpayment,
              "Tö 3 Ay" : row.reportvalues.pins3A,
              "Tö 12 Ay" :row.reportvalues.pins12A,
              "Tö 1 Yıl Sonra" : row.reportvalues.pins1YS,
              "Ts Toplam" :row.reportvalues.pinsTStop,
              "Ts 1 Ay": row.reportvalues.pinsTS1A,
              "Ts 3 Ay" : row.reportvalues.pinsTS3A,
              "Ts 12 Ay" : row.reportvalues.pinsTS12A,
              "Ts 1 Yıl Sonra" : row.reportvalues.pinsTS1YS,
              "Çb 1 Ay": row.reportvalues.t1, 
              "Çb 3 Ay" : row.reportvalues.t3,
              "Çb 12 Ay" : row.reportvalues.t12,
    
    
            });

          }
          
          
        });
        this.tabledata = filtereddata;
        this.temp = filtereddata;

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
      { prop: 'Müşteri Adı' , name: 'Müşteri', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'Kullanıcı' , name: 'Kullanıcı', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'Sözleşme No' , name: 'Söz. No', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'Tarih' , name: 'Tarih', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'Durum' , name: 'Durum', sortable: true  , cellTemplate: this.status, headerTemplate: this.hdrTpl},
      { prop: 'Tö Toplam' , name: 'Tö.Top', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell },
      { prop: 'Tö 1 Ay' , name: 'Tö.1A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Tö 3 Ay' , name: 'Tö.3A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Tö 12 Ay' , name: 'Tö.12A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Tö 1 Yıl Sonra' , name: 'Tö.1.Ys', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Ts Toplam' , name: 'Ts.Top', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Ts 1 Ay' , name: 'Ts.1A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Ts 3 Ay' , name: 'Ts.3A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Ts 12 Ay' , name: 'Ts.12A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Ts 1 Yıl Sonra' , name: 'Ts.1.Ys', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Çb 1 Ay' , name: 'Çb.1A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Çb 3 Ay' , name: 'Çb.3A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'Çb 12 Ay' , name: 'Çb.12A', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      /* { prop: 'ttt' , name: '', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'tcm' , name: 'Tamamlanan', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'tcn' , name: 'İptal', sortable: true, headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell} */
      ];
    
  }

  statusfilter(){

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function (d) {
      return (d['Müşteri Adı']+'').toLowerCase().indexOf(val) !== -1 || (d['Sözleşme No']+'').toLowerCase().indexOf(val) !== -1 
      || (d['Durum']+'').toLowerCase().indexOf(val) !== -1 || !val;
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

import { Component, OnInit , ViewEncapsulation , OnDestroy , ViewChild , TemplateRef } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { TabDirective } from 'ngx-bootstrap';
import { NgStyle } from '@angular/common';
import { isThisISOWeek } from 'date-fns';

@Component({
  selector: 'app-calculateview',
  templateUrl: './calculateview.component.html',
  styleUrls: ['./calculateview.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class calculateviewComponent implements OnInit , OnDestroy {

  @ViewChild('dodeme', { static: true }) dodeme : TemplateRef<any>;
  
  columns = [];

  tableselected = [];

  /* teslimatdonemi: any;
  modeladi: any;
  teslimdetay: any = [];
  aracadi: any;
  konutadi: any;
  grupadi: any;
  rateafterinstallment: any;
  numberofgroupsOptions: any = [];
  numberofgroupsModel:any = null;
  numberofgroups: any;
  installmentstartdateModel:any = null;
  installmentstartdateModelc:any = null;
  installmentstartdateModelci:any = null; 
  username:any = '';
  deliveryperiodOptions: any = [];
  deliveryperiodModel: any = null;
  offerstatusOptions:any = [{i:0,n:'Bekliyor'},{i:1,n:'Aktif'},{i:2,n:'Verildi'}];
  offerstatusModel: null;
  offervaliditydate: any;
  firstinstallmentModel: any = null;
  postdeliveryinstallmentsModel: any = null;
  tarih: any = [];
  installmentstartdateOptions: any = [];
  selectedmonthintable : any = 0;
  workingfeeModel: any = null;
  workingfeeModeli: any = null;
  workingfeeModelson: any = null;
  discountOptions: any =[];
  discountModel: any = 517;
  teslimayi: any = {};
  totalcost: any = null;
  totalcostModel: any = null;
  housingOptions: any = [];
  housingGroupOptions: any = {};
  housingModel:any = null;
  carGroupOptions: any = {};
  tarihim: any = {}; 
  campaignpriceOptions: any = [];
  campaignpriceModel:any = null;
  discountedworkingfeeModel:any = null;
  discountpriceModel:any = null;
  campaignpriceOptionsAll: any = {};
  carOptions: any = [];
  carModel: any = null;
  groupOptionsAll: any = {};
  groupOptions: any = [];
  groupModel: null;
  taksitaysayisi: any = {};
  deliverypriverate: any;
 
  numberofinstallmentsOptions: any = [];
  numberofinstallmentsModel:any = 460;
  taksitsayisi: any = null;
  bugun: any;
  downpaymentrateModel: any;
  downpaymentamountModel: any;
  amountexcludingdownpaymentModel: any; 
  companyModel = null;
  statusModel = 0;
  firstmonthtotalpaymentModel : any = null;*/

  bidvalues:any = {};

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;
  public tablerow: any;
  yillikartis: any;
  predeliverypayment: any;
  formid : any;
  tabledata:any = [];
  companyOptions:any = {};
  installmentstartDates:any = [];
  installmentstartDatesi:any = []; 
  // tablo değişkenleri
  pesinattutari: any;
  twelvemonthlypayments: any;
  bimonthlypayment: any;
  companyaddress :any = '';
  orderdates: any;
  offervalidityperiod: any;
  aftertwelvemonthlypayments: any;
  postdeliverypayment: any;
  pdbimonthlypayment: any;
  pdfirstmonthlypayment: any;
  pdtwelvemonthlypayment: any;
  pdaftertwelvemonthlypayments: any;

  phone: any;
  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {
    
    this.phone    = this.pocu.userInfo.uPhone;  
   
   this.pocu.getJSONResult('adminCompanyList' , 0).subscribe( data => {
      data.forEach(adr => { this.companyOptions[ adr.i ] = adr.n; });
  });

  }

  k: any  = null;

  table(){
    var rows = [];
        var toplamodeme = 0;
    //peşinat satırı
    var thisdatenowa = new Date(this.bidvalues['installmentstartdatec']);

    if(this.bidvalues['downpaymentamount'] > 0){
      toplamodeme = toplamodeme + this.bidvalues['downpaymentamount'];

      var m = thisdatenowa.getMonth()+1,
      y=thisdatenowa.getFullYear(),
      d=thisdatenowa.getDate();
      thisdatenowa.setMonth( thisdatenowa.getMonth()+1 );
      var formatted = d +'/'+ (m<10?'0':'')+m + '/'+y;

      

      rows.push({
        donem : '#',
        tarih : formatted,
        dodeme : this.bidvalues['downpaymentamount'],
        todeme : toplamodeme,
        tur : 'Proje Peşinatı'
      })
    }
    
    if(this.bidvalues['numberofinstallmentsvalue'] == null) this.bidvalues['numberofinstallmentsvalue'] = 0;
    if(this.bidvalues['numberofinstallmentsvalue'] == 0){ this.k = 1; }else {this.k = this.bidvalues['numberofinstallmentsvalue'];}
    
    //çalışma Bedeli Taksitleri
    
    var thisdatenowa = new Date(this.bidvalues['installmentstartdatec']); 
    

    for(i=1; i<=this.k; i++){
      
      var m = thisdatenowa.getMonth()+1,
      y=thisdatenowa.getFullYear(),
      d=thisdatenowa.getDate();
      thisdatenowa.setMonth( thisdatenowa.getMonth()+1 );
      var formatted = d +'/'+ (m<10?'0':'')+m + '/'+y;
 
      if(this.k == 1){
        toplamodeme = toplamodeme + this.bidvalues['discountedworkingfee'] / this.k;
      }else{
        toplamodeme = toplamodeme + this.bidvalues['monthlyinstallments'][i];
      }

      

      if(this.k == 1){
        rows.push({
          donem : '#',
          tarih : formatted,
          dodeme : this.bidvalues['discountedworkingfee'],
          todeme : toplamodeme,
          tur : 'Çalışma Bedeli'
          
        })
      }else {
        rows.push({
          donem : '#',
          tarih : formatted,
          dodeme : this.bidvalues['monthlyinstallments'][i],
          todeme : toplamodeme,
          tur : 'Çalışma Bedeli'
          
        })
      }
      
     
    }
    //Proje Taksitleri
    var thisdatenowaz = new Date(this.bidvalues['installmentstartdate']);
    thisdatenowaz.setDate(20);
    
    var bg = this.k - 1;
    var taksit = this.bidvalues['firstinstallment'];
    var x = 1; var a = 1; var artis = ''; var artisi = ''; var taksitodeme = 0; var yillikartismiktari=0;
    
    var ml = thisdatenowaz.getMonth(),
    y=thisdatenowaz.getFullYear(),
    d=thisdatenowaz.getDate();
    thisdatenowaz.setMonth( thisdatenowaz.getMonth());

    var toplamode = 0;

    for(var i=1 ; i <= 1000 ; i++){

      ml = thisdatenowaz.getMonth()+1,
      y=thisdatenowaz.getFullYear(),
      d=thisdatenowaz.getDate();
      
      thisdatenowaz.setMonth( thisdatenowaz.getMonth()+1);


      

      var formatted = d +'/'+ (ml<10?'0':'')+ml + '/'+y;
      bg++;
      x = i;
      x %= 12;
      
      if(x == 1 && i > 1){
        if(this.yillikartis == 0){}else {
          yillikartismiktari = Math.round(a * (this.bidvalues['annualincrease'] * this.bidvalues['campaignprice']));
          artisi = '(Yıllık Artış)';
          a++;
        }
      }else{ artisi = '';}

      if(this.bidvalues['deliveryperiodlastvalue'] == i){
        
        // this.tableselected = [data[2]];
        
        //burda teslim ayını alıp split yapıp i ye eşitleyim teslim olan satırı bulup renklendirme yapılabilir
        taksit = this.bidvalues['postdeliveryinstallments'];
        artis = '(Teslim Dönemi)';
      }else { artis = ''}

      if(i<13){ taksitodeme = taksit;}else { taksitodeme = taksit + yillikartismiktari; }
      
      toplamodeme = toplamodeme + Math.round(taksitodeme);

      if(toplamodeme > this.bidvalues['totalcost'] ){
        taksitodeme = this.bidvalues['totalcost'] - (toplamodeme  - Math.round(taksitodeme));
        toplamodeme = this.bidvalues['totalcost'];
        x = 2000;
      }
      rows.push({
        donem : i +'. Ay', 
        tarih : formatted,
        dodeme : taksitodeme,
        todeme : toplamodeme,
        tur : 'Proje Taksitleri' + artis + artisi
      });
      if(x == 2000) {
        break;
      }
    }
    var a = 0;
    a = this.k * 1;
    if(this.bidvalues['downpaymentamount'] <= 0){
      a = a - 1;
    };
    this.tableselected = [rows[this.bidvalues['deliveryperiodlastvalue'] + a ]  ];

    this.tabledata = rows;
        
  }

  orderdate(){
    var tarih = this.bidvalues['updatedate'].split(' ');
    var tarih1 = tarih[0].split('-');
    var y = tarih1[0], m= tarih1[1], d=tarih1[2];
    this.orderdates = d + "/" + m + "/" + y;
    this.offervalidityperiod = (d*1) + 1 + "/" + m + "/" + y;
  }
  
  printDocument(){ window.print();}

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  ngOnInit() { 

    this.columns = [
      {prop: 'donem' , name : 'Dönem'} ,
      {prop: 'tarih' , name : 'Tarih'} ,
      {prop: 'dodeme' , name : 'Dönem Ödeme' , cellTemplate: this.dodeme } ,
      {prop: 'todeme' , name : 'Toplam Ödeme' , cellTemplate: this.dodeme } ,
      {prop: 'tur' , name : 'Ödeme Türü'}
    ];

    this.aroute.paramMap.subscribe(params => { 
      this.formid = params.get('id');
      if(this.formid !== 'new'){
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {
          /* console.log(data);
          const values = {};
          for(let k in this.pocuErrorHandlers){
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='identitycheck' || k=='offerstatus' ? 0:'');
          }  */

          this.bidvalues = data;
          console.log(this.bidvalues);

          this.bidvalues['kampanyabedeli'] = this.bidvalues['campaignprice'];
          
         // this.companyaddress = this.companyOptions[ this.bidvalues['insertcompanyid'] ];
          
          if(this.bidvalues['housing'] > 0){
            this.pocu.getJSONResult('paramDetail' , this.bidvalues['housing']).subscribe( result => {
              this.bidvalues['calistype'] = 'Konut';
              this.bidvalues['calisname'] = result['paramname_view'];
            });
          }else if(this.bidvalues['car'] > 0){
            this.pocu.getJSONResult('paramDetail' , this.bidvalues['car']).subscribe( result => {
              this.bidvalues['calistype'] = 'Araç';
              this.bidvalues['calisname'] = result['paramname_view'];
            });
          }
          this.orderdate();
          this.table();
          // this.userForm.setValue(values);

          // if(values['housing'] > 0){ this.housingOptions.forEach(elm => { if(elm.i == values['housing'] ) this.housingOnChange(elm); }); }
          // else if(values['car'] > 0){ this.carOptions.forEach(elm => { if(elm.i == values['car'] ) this.carOnChange(elm); }); }

          // this.groupModel = values['installmentgroup'];
          // this.groupOptions.forEach(elm => { if(elm.i == values['installmentgroup'] ) this.housingGroupOnChange(elm); });
        });
      }
    }); 
    
  }
  
  cancel() {
    this.router.navigate(['/installmentcalc/calculates']);
  }

}

import { Component, OnInit , ViewEncapsulation , OnDestroy , ViewChild , TemplateRef , Input } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { TabDirective } from 'ngx-bootstrap';
import { NgStyle } from '@angular/common';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-calculateform',
  templateUrl: './calculateform.component.html',
  styleUrls: ['./calculateform.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class calculateformComponent implements OnInit , OnDestroy {

  @ViewChild('dodeme', { static: true }) dodeme : TemplateRef<any>;
  @ViewChild('myModal', { static: true }) myModal;

  columns = [];
  tableselected = [];

  teslimatdonemi: any;
  modeladi: any;
  teslimdetay: any = [];
  aracadi: any;
  konutadi: any;
  grupadi: any;
  rateafterinstallment: any;
  numberofgroupsOptions: any = [];
  numberofgroupsModel:any = null;
  numberofgroups: any;

  installmentfinishmonth: any;
  installmentfinishmonthModel:any = null;

  installmentstartdateModel:any = null;
  installmentstartdateModelc:any = null;
  installmentstartdateModelci:any = null;
  bugun: any;
  username:any = '';
  offervaliditydateonly: any = '';
  deliveryperiodOptions: any = [];
  deliveryperiodModel: any = null;
  todaydateonly: any = '';
  offerstatusOptions:any = [{i:0,n:'Değerlendirmede'},{i:1,n:'Teklif Verildi'},{i:2,n:'Sözleşme Yapıldı'}];
  offerstatusModel: null;
  
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
  campaignpricedefModel:any = null;
  campaignpriceModel:any = null;
  discountedworkingfeeModel:any = null;
  discountpriceModel:any = null;
  campaignpriceOptionsAll: any = {};
  carOptions: any = [];
  carModel: any = null;
  yillikartis: any;
  groupOptionsAll: any = {};
  groupOptions: any = [];
  groupModel: null;
  taksitaysayisi: any = {};
  deliverypriverate: any;
  todaydates: any;
  numberofinstallmentsOptions: any = [];
  numberofinstallmentsModel:any = 460;
  taksitsayisi: any = null;
  downpaymentrateModel: any;
  downpaymentamountModel: any;
  amountexcludingdownpaymentModel: any;
  firstmonthtotalpaymentModel : any = null;
  
  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;
  public tablerow: any;

  formid : any;
  companyModel = null;
  statusModel = 0;
  tabledata:any = [];
  companyOptions:any = [];
  installmentstartDa:any = [];
  installmentstartDates:any = [];
  installmentstartDatesi:any = []; 
  geteditformcounter:number = 0;
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
  predeliverypayment: any;
  firstmonthpaymentofworkfee: any;
  threemonthpaymentofworkfee: any;
  twelvemonthpaymentofworkfee: any;
  changedate: any;
  basay: any;
  downpaymentrateModeli: any;
  iskontobuyuk: any;
  pdfteslimtarihi: any;
  pdfteslimtarih: any;
  monthlyinstallments: any = {};
  monthlyinstallmentsGroup:any = [];
  firstinstallmentrate: any;
  sayfaacik: any = 0;
  firstopen: any = 0;
  formsubmitoperation:any = 0;
  taksitesitmi: any = 0;
  

  constructor( private modalService: NgbModal , public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {
    
    this.pocuErrorHandlers = { 
      offerstatus: new FormControl(''),
      housing: new FormControl(''),
      car: new FormControl(''),
      discountedworkingfee: new FormControl(''),
      discountprice: new FormControl(''),
      installmentgroup: new FormControl(''),
      customername: new FormControl('', Validators.required),
      contractnumber: new FormControl(''),
      userfullname: new FormControl(''),
      campaignprice: new FormControl('', Validators.required),
      downpaymentrate: new FormControl('', [Validators.required , Validators.max(99)]), // [Validators.required, Validators.maxLength(2), Validators.max(31), Validators.min(1)]
      deliveryperiod: new FormControl('', Validators.required),
      numberofgroups: new FormControl('', Validators.required),
      downpaymentamount: new FormControl('', Validators.required),
      amountexcludingdownpayment: new FormControl('', Validators.required),
      installmentstartdate: new FormControl('', Validators.required),
      installmentstartdatec: new FormControl('', Validators.required),
      workingfee: new FormControl('', Validators.required),
      discount: new FormControl(''),
      numberofinstallments: new FormControl('', Validators.required),
      firstinstallment: new FormControl('', Validators.required),
      postdeliveryinstallments: new FormControl('', Validators.required),
      totalcost: new FormControl('', Validators.required),
      firstmonthtotalpayment: new FormControl('', Validators.required),
      installmentfinishmonth: new FormControl(''),
    };

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.username = this.pocu.userInfo.displayName + ' ' + this.pocu.userInfo.surName;
    
    this.pocu.getJSONResult('paramList' , 26).subscribe( data => {
      this.campaignpriceOptions = data.jsn;

      this.geteditformcounter++;
    }); // Kampanya 

    this.pocu.getJSONResult('paramList' , 23).subscribe( data => {
      this.carOptions = data.jsn;

      this.geteditformcounter++;
    }); // ARAÇ LİSTESİ

    this.pocu.getJSONResult('paramList' , 28).subscribe( data => {
      this.discountOptions = data.jsn;
      this.discountOptions.forEach(dc => {
        this.iskontobuyuk = dc.n
      });
      
     
      this.geteditformcounter++;
    }); // İSKONTO ORANI

    this.pocu.getJSONResult('paramList' , 19).subscribe( data => {
      this.housingOptions = data.jsn;
      
      this.geteditformcounter++;
    }); // KONUT LİSTESİ

    this.pocu.getJSONResult('paramList' , 31).subscribe( data => {

      data.jsn.sort((a, b) => a['t'] > b['t'] ? 1 : -1 );
      // {i: 493, n: "48 Ay", t: 48, p: 431}
      
      data.jsn.forEach(rw => {
        
        rw.s2 = rw.s2.length>1 ? JSON.parse(rw.s2) : {};
        rw.s = rw.s.length>1 ? JSON.parse(rw.s) : {};
        if(!this.housingGroupOptions[ rw.p ]) this.housingGroupOptions[ rw.p ] = [];

        this.housingGroupOptions[ rw.p ].push(rw);

      });

      this.geteditformcounter++;
      
    }); // KONUT GRUP LİSTESİ

    this.pocu.getJSONResult('paramList' , 32).subscribe( data => {
      // {i: 493, n: "48 Ay", t: 48, p: 431}
      data.jsn.forEach(rw => {
       
        rw.s2 = rw.s2.length>1 ? JSON.parse(rw.s2) : {};
        rw.s  = rw.s.length>1 ? JSON.parse(rw.s) : {};
        if(!this.carGroupOptions[ rw.p ]) this.carGroupOptions[ rw.p ] = [];
        this.carGroupOptions[ rw.p ].push(rw);
      });

      this.geteditformcounter++;
    }); // ARAÇ GRUP LİSTESİ

    this.totalcostModel = this.workingfeeModelson + this.campaignpriceModel*1;
    this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;

    this.pocu.getJSONResult('paramList' , 27).subscribe( data => {
      this.numberofinstallmentsOptions = data.jsn;

      this.geteditformcounter++;
    }); // TAKSİT SAYISI

    this.pocu.getJSONResult('paramList' , 33).subscribe( data => {
      
      data.jsn.forEach((rw,i) => {
        rw.s  = rw.s.length>1 ? JSON.parse(rw.s) : {};
        rw.s2 = rw.s2.length>1 ? JSON.parse(rw.s2) : {};
      }); 

      this.teslimdetay = data.jsn;

      this.geteditformcounter++;

    });
   
    this.pocu.getJSONResult('paramList' , 30).subscribe( data => {
      
      data.jsn.forEach(jv => {
        
        if(jv.i == 492) this.workingfeeModel = jv.t;
          
        if(jv.i == 516) this.workingfeeModeli = jv.t;
          
      });

      this.geteditformcounter++;

    }); // TL GRUPLAR

    this.pocu.getJSONResult('paramList' , 35).subscribe( data => {

      this.firstinstallmentrate = data.jsn;

      data.jsn.forEach(jv => {
        
        
       this.firstinstallmentrate = jv.n;
          
      });

      this.geteditformcounter++;
    }); // Çalışma Bedeli Hesaplanırken İlk Taksit Oranı


    this.downpaymentrateModel = 0;
    this.downpaymentamountModel = 0;

    var thisdatenows = new Date();
    thisdatenows.setDate(20);
    for(var i = 1; i < 14 ; i++){

      var m = thisdatenows.getMonth()+1,y=thisdatenows.getFullYear(),d=thisdatenows.getDate();
      thisdatenows.setMonth( thisdatenows.getMonth()+1 );
      
      var ymd = y+'-'+(m<10?'0':'')+m+'-'+d;
      var formatted = d +'/'+ (m<10?'0':'')+m + '/'+y;
      this.installmentstartDa.push({'i':ymd,'n':formatted});
      this.basay  = (m*1);
      
    }
  

    var thisdatenow = new Date();
    thisdatenow.setDate(20);

    for(var i = 1; i < 23 ; i++){

      var m = thisdatenow.getMonth()+1,y=thisdatenow.getFullYear(),d=thisdatenow.getDate();
      thisdatenow.setMonth( thisdatenow.getMonth()+1 );
      var ymd = y+'-'+(m<10?'0':'')+m+'-'+d;
      var formatted = d +'/'+ (m<10?'0':'')+m + '/'+y;
      this.installmentstartDates.push({'i':ymd,'n':formatted});
    }

    

    this.installmentstartdateModel = this.installmentstartDates[0].i;

    this.installmentstartdateModelc = this.installmentstartDates[0].i;
    
    
   
  }

  
  housingOnChange(ev1){
    
    this.konutadi = null;
    this.numberofgroupsModel = null;
    this.selectedmonthintable = 0;
    this.deliveryperiodModel = null;
    this.tabledata = [];

    if( typeof ev1 !== 'undefined'){ this.konutadi = ev1.n; }
    
    this.groupOptions = this.housingModel > 0 ? this.housingGroupOptions[ this.housingModel ] : [];

    this.carModel =  null;

    if(this.groupOptions.length == 1){
      this.groupModel = this.groupOptions[0].i;
      this.housingGroupOnChange( this.groupOptions[0] );
    } 

  }

  carOnChange(ev2){

    
    this.konutadi = null;
    this.aracadi = null;
    this.numberofgroupsModel = null;
    this.selectedmonthintable = 0;
    this.deliveryperiodModel = null;
    this.tabledata = [];

    if( typeof ev2 !== 'undefined'){ this.aracadi = ev2.n; }
    
    this.groupOptions = this.carModel > 0 ? this.carGroupOptions[ this.carModel ] : [];

    this.housingModel = null;  

      if(this.groupOptions.length == 1)
      {
        this.groupModel = this.groupOptions[0].i;
        this.housingGroupOnChange( this.groupOptions[0] );
      }

  }

  housingGroupOnChange( ev ){
    
    if(this.housingModel > 0 || this.carModel > 0){
      if(typeof ev !== "undefined" ){
        
        this.teslimayi = ev.t2;
        if(this.firstopen == 1) this.numberofgroupsModel = ev.t;
        this.deliveryperiodModel = ev.s.teslimdonemi;
        
        this.yillikartis = ev.s.yillikartisorani;
        this.selectedmonthintable = ev.t2;
        this.deliverypriverate = ev.s2.calismabedeli;
        
        this.rateafterinstallment = ev.s2.taksitsonrasiartis;
        this.grupadi = ev.n;
        
        this.deliveryperiodOnChange('fn');
        this.teslimdonemihesaplama();
        this.tablo();
  
      }else{ 
        this.numberofgroupsModel = null;
        this.selectedmonthintable = 0;
        this.deliveryperiodModel = null;
        this.tabledata = [];
        this.deliveryperiodOnChange('fn');
      }
    }

  }

  changenumberofgroup(){ // grup sayısı değiştiğinde çalışır 
    this.firstinstallmentModel = null; //ilk taksit
    this.postdeliveryinstallmentsModel = null; // teslim sonrası ilk taksit
    this.firstinstallmentModel = Math.round(this.amountexcludingdownpaymentModel / this.numberofgroupsModel); //grup sayısı değiştiğinde ilk taksiti hesaplar
    this.postdeliveryinstallmentsModel = Math.round(this.firstinstallmentModel + this.campaignpriceModel * this.rateafterinstallment); // grup sayısı değiştiğinde teslim sonrası taksiti hesaplar
    this.teslimdonemihesaplama();
    this.tablo();
  }

  downpaymentOnChange(){
     //peşinat oranı değişirse
     
     this.downpaymentamountModel = (this.campaignpriceModel/100) * this.downpaymentrateModel;
     this.amountexcludingdownpaymentModel = this.campaignpriceModel - this.downpaymentamountModel;
     this.firstinstallmentModel = Math.round(this.amountexcludingdownpaymentModel / this.numberofgroupsModel);
     this.postdeliveryinstallmentsModel = Math.round(this.firstinstallmentModel + this.campaignpriceModel * this.rateafterinstallment);
     if(this.taksitaysayisi > 1){
      this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
    }else{
      this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
    }
     
    this.teslimdonemihesaplama();
    this.tablo();
  }

  downpaymentrateOnChange(){
    //peşinat tutarı değişirse
    if(this.downpaymentamountModel == null || this.downpaymentamountModel == ''){
      this.downpaymentamountModel = 0;
    
     };
     
     this.downpaymentrateModeli = this.downpaymentamountModel / this.campaignpriceModel * 100;

     if(this.downpaymentrateModeli == Math.round(this.downpaymentrateModeli)){
      this.downpaymentrateModel = this.downpaymentrateModeli;
     }else{
      this.downpaymentrateModel = this.downpaymentrateModeli.toFixed(2);
     }
     

     this.amountexcludingdownpaymentModel = this.campaignpriceModel - this.downpaymentamountModel;
     
     this.firstinstallmentModel = Math.round(this.amountexcludingdownpaymentModel / this.numberofgroupsModel);
     this.postdeliveryinstallmentsModel = Math.round(this.firstinstallmentModel + this.campaignpriceModel * this.rateafterinstallment);
     console.log(this.downpaymentamountModel);
     if(this.taksitaysayisi > 1){
      this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
    }else{
      this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
    }
     this.teslimdonemihesaplama();   
     this.tablo(); 
  }

  campaignpriceOnChange(){

    if(this.campaignpriceModel < 10000){
      this.campaignpriceModel = this.campaignpriceModel * 1000;
      this.campaignpriceOnKeyup();
    }


  }

  campaignpriceOnKeyup(){
    // kampanya bedeli değişirse

    this.deliveryperiodOnChange('fn');

    // this.campaignpriceModel = this.campaignpricedefModel * 1000;
    
    this.amountexcludingdownpaymentModel = this.campaignpriceModel - this.downpaymentamountModel;
    
    this.totalcostModel = this.workingfeeModelson + this.campaignpriceModel*1; 
    this.firstinstallmentModel = Math.round(this.amountexcludingdownpaymentModel / this.numberofgroupsModel);
    this.postdeliveryinstallmentsModel = Math.round(this.firstinstallmentModel + this.campaignpriceModel * this.rateafterinstallment);
    if(this.taksitaysayisi > 1){
      this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
    }else{
      this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
    }
    this.downpaymentrateModeli = this.downpaymentamountModel / this.campaignpriceModel * 100;

     if(this.downpaymentrateModeli == Math.round(this.downpaymentrateModeli)){
      this.downpaymentrateModel = this.downpaymentrateModeli;
     }else{
      this.downpaymentrateModel = this.downpaymentrateModeli.toFixed(2);
     }
    this.tablo();
    
  } 

  installmentstartdateOnChange( objtype ){

    if(objtype == 'isc'){

      var dfrom = this.installmentstartdateModelc.split('-');
      var workinstalldatetype = new Date(dfrom[0], dfrom[1] - 1, dfrom[2]);
      workinstalldatetype.setMonth( workinstalldatetype.getMonth() + this.taksitaysayisi );
      var m = workinstalldatetype.getMonth()+1,y=workinstalldatetype.getFullYear(),d=workinstalldatetype.getDate();
      var ymd = y+'-'+(m<10?'0':'')+m+'-'+d , slctmonthkey = 0;
      this.installmentstartDates.forEach((sm,si) => { if(sm.i == ymd) slctmonthkey = si; });
      this.installmentstartdateModel = this.installmentstartDates[ slctmonthkey ].i;
    }

    this.tablo();
  }
  


  


  deliveryperiodOnChange( objtype ){

    var iskonto;
    
    this.numberofinstallmentsOptions.forEach(ins => {
      if(ins.i == this.numberofinstallmentsModel) this.taksitsayisi = ins.n;});
    if (this.taksitsayisi == null){
      this.taksitsayisi = 0;
    }
    this.discountOptions.forEach(ins => {
      if(ins.i == this.discountModel) iskonto = ins.n;
    });
    if (iskonto == null){
      iskonto = 0;
    }
    var ka = this.campaignpriceModel * this.deliverypriverate; 
    var kb = ka * this.workingfeeModel / 100 + ka; // iskontosuz çalışma bedelini verir
    if(this.taksitsayisi > 1){
      kb = kb * this.workingfeeModeli / 100 + kb;
    }   
    
    var kp = this.campaignpriceModel * this.deliverypriverate; 
    var kt = kp * this.workingfeeModel / 100 + kp;
    kp = kt - (iskonto * kp / 100);
    if(this.taksitsayisi > 1){
      var kt = kp * this.workingfeeModeli / 100;
      kp = kp + kt;
    }
    this.taksitaysayisi = this.taksitsayisi;
    
    if(objtype == 'ni'){
      
      var dfrom = this.installmentstartdateModelc.split('-');
      var workinstalldatetype = new Date(dfrom[0], dfrom[1] - 1, dfrom[2]);
      workinstalldatetype.setMonth( workinstalldatetype.getMonth() + this.taksitaysayisi );
      var m = workinstalldatetype.getMonth()+1,y=workinstalldatetype.getFullYear(),d=workinstalldatetype.getDate();
      var ymd = y+'-'+(m<10?'0':'')+m+'-'+d , slctmonthkey = 0;
      this.installmentstartDates.forEach((sm,si) => { if(sm.i == ymd) slctmonthkey = si; });
      this.installmentstartdateModel = this.installmentstartDates[ slctmonthkey ].i;
      this.taksitModalHesapla();
      
      if(this.taksitaysayisi > 1){
        this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
      }else{
        this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
      }
      
    }else{
      this.installmentstartdateModel = this.installmentstartDates[this.taksitaysayisi ].i;
      this.taksitModalHesapla();
      
    } 


    this.discountpriceModel = Math.round(kb); 

    if(objtype !== 'dw'){
      if(iskonto !== 0){
        this.discountedworkingfeeModel = this.discountpriceModel * iskonto / 100; //iskonto tutarı
        this.workingfeeModelson = Math.round(this.discountpriceModel - this.discountedworkingfeeModel); // iskontolu tutar
        this.taksitModalHesapla();
      }else {
        this.workingfeeModelson = Math.round(this.discountpriceModel - this.discountedworkingfeeModel);
        this.taksitModalHesapla();
      }
    }
    
    if(objtype == 'dp' ){

      this.discountModel = null;
      this.totalcostModel = this.workingfeeModelson + this.campaignpriceModel*1;
      this.taksitsayisi = 1; 
      this.numberofinstallmentsModel = this.numberofinstallmentsOptions[0].i;
      /* if(this.taksitaysayisi > 1){
        this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
      }else{
        this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
      } */
      
      this.taksitModalHesapla();
    }else if(objtype == 'dw'){
      this.discountModel = null;

      
      this.discountedworkingfeeModel = this.discountpriceModel - this.workingfeeModelson;
      this.totalcostModel = this.workingfeeModelson + this.campaignpriceModel*1;
      if(this.taksitaysayisi > 1){
        this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
      }else{
        this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
      }
      this.taksitModalHesapla();
    }else if(objtype == 'ds'){ 
      
      
      
      this.totalcostModel = this.workingfeeModelson + this.campaignpriceModel*1;
      if(this.taksitaysayisi > 1){
        this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
      }else{
        this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
      }
      this.taksitModalHesapla();
    }else{
      
      
      this.firstinstallmentModel = Math.round(this.amountexcludingdownpaymentModel / this.numberofgroupsModel);
      this.postdeliveryinstallmentsModel = Math.round(this.firstinstallmentModel + this.campaignpriceModel * this.rateafterinstallment);
      
      
      this.totalcostModel = this.workingfeeModelson + this.campaignpriceModel*1;
      if(this.taksitaysayisi > 1){
        this.firstmonthtotalpaymentModel = this.monthlyinstallments[ 1 ];
      }else{
        this.firstmonthtotalpaymentModel = this.downpaymentamountModel + this.workingfeeModelson + this.firstinstallmentModel;
      }
      //if( iskonto !== 0 ) this.discountedworkingfeeModel = this.discountpriceModel - this.workingfeeModelson;

      this.taksitModalHesapla();
      this.tablo();
    } 
    
    //this.disdiscouountedworkingfeeModel = this.discountpriceModel - this.workingfeeModelson;

    this.tablo();

  }

  taksitModalHesapla(){
    
    
    
    if(this.workingfeeModelson < 0) return;
    if(this.monthlyinstallments == null){
      this.monthlyinstallmentsGroup = [];
      this.monthlyinstallments      = {};
      var deger = 0;
      
      for(var t = 1; t <= this.taksitaysayisi ; t++){

        if(t == 1 ){
          this.monthlyinstallmentsGroup.push( t ); // satır sayısı 1dir
          
          this.monthlyinstallments[ t ] =  Math.round( this.workingfeeModelson * (this.firstinstallmentrate / 100) ); //ilk satırda %35 olduğunu hesaplar
        }else{

          this.monthlyinstallmentsGroup.push( t ); //satır sayısını çizer
          this.monthlyinstallments[ t ] =  Math.round( (this.workingfeeModelson - (this.workingfeeModelson * (this.firstinstallmentrate / 100 ))) / (this.taksitaysayisi - 1) ); //ilk taksit hariç kalan taksitleri eşit böler
        }
      
        deger = this.monthlyinstallments[ t ] + deger; //

      }

      this.monthlyinstallments[ this.taksitaysayisi ] =  this.workingfeeModelson - deger + this.monthlyinstallments[ this.taksitaysayisi ]; //son satırda kalan küsüratı ekler
      
    }else if(this.monthlyinstallments !== null  && typeof this.monthlyinstallmentsGroup[1] == 'undefined'  ){
      
      
      for(var t = 1; t <= this.taksitaysayisi ; t++){
        
        this.monthlyinstallmentsGroup.push( t );
        this.monthlyinstallments[ t ] =  Math.round( (this.workingfeeModelson - (this.workingfeeModelson * (this.firstinstallmentrate / 100 ))) / (this.taksitaysayisi - 1) ); //ilk taksit hariç kalan taksitleri eşit böler
        
      } 
      
      
      
    }else if(this.monthlyinstallments !== null  && typeof this.monthlyinstallmentsGroup[1] !== 'undefined'  ){
      
      this.monthlyinstallmentsGroup = [];
      this.monthlyinstallments      = {};
      for(var t = 1; t <= this.taksitaysayisi ; t++){
        
        this.monthlyinstallmentsGroup.push( t );
        this.monthlyinstallments[ t ] =  Math.round( (this.workingfeeModelson - (this.workingfeeModelson * (this.firstinstallmentrate / 100 ))) / (this.taksitaysayisi - 1) ); //ilk taksit hariç kalan taksitleri eşit böler
        
      } 
      
      
      
    }
    
    this.taksitModalKaydet(); 
    
  }

  taksitModalKaydet(){
    
    var toplamcalisma = 0;
    var deger = 0;
    
    if( Math.round( this.workingfeeModelson * this.firstinstallmentrate / 100) > this.monthlyinstallments[ 1 ]){
      const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning', cancelButton: 'btn btn-danger' }, buttonsStyling: false});
      if(this.sayfaacik == 1 ){
        //alert("Çalışma Bedeli İlk Taksit En Az " +  Math.round( this.workingfeeModelson * this.firstinstallmentrate / 100) +  " Olabilir")
        swalWithBootstrapButtons.fire({
          title: 'Çalışma Bedeli', html:'Çalışma Bedeli İlk Taksit En Az ' + Math.round( this.workingfeeModelson * this.firstinstallmentrate / 100)  + ' ₺ Olmalıdır' , type: 'error', showCancelButton: true, showConfirmButton:false, confirmButtonText: '...', cancelButtonText: 'Kapat', reverseButtons: false
        }).then((result) => { });
      }  
      this.monthlyinstallments[ 1 ] =  Math.round( this.workingfeeModelson * this.firstinstallmentrate / 100);
      if(this.sayfaacik == 1 ) this.workingfeeinstallments();
      for(var t = 2; t <= this.taksitaysayisi ; t++){
        
        
        this.monthlyinstallments[ t ] =  Math.round( (this.workingfeeModelson - (this.workingfeeModelson * (this.firstinstallmentrate / 100 ))) / (this.taksitaysayisi - 1) ); //ilk taksit hariç kalan taksitleri eşit böler
        deger = this.monthlyinstallments[ t ] + deger; //
      }
      this.monthlyinstallments[ this.taksitaysayisi ] =  this.workingfeeModelson - deger + this.monthlyinstallments[ this.taksitaysayisi ] - this.monthlyinstallments[ 1 ]; //son satırda kalan küsüratı ekler
      
    }else{
      for(var t = 1; t <= this.taksitaysayisi ; t++){
        
        
        deger = this.monthlyinstallments[ t ];
        
        toplamcalisma = toplamcalisma + deger ;
        
      }
      
      if(toplamcalisma !== this.workingfeeModelson){
        
        /* const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning', cancelButton: 'btn btn-danger' }, buttonsStyling: false});
        if(this.sayfaacik == 1 ){
          swalWithBootstrapButtons.fire({
            title: 'Çalışma Bedeli', html:'Toplam Çalışma Bedeli ' + this.workingfeeModelson  + ' ₺ Olmalıdır' , type: 'error', showCancelButton: true, showConfirmButton:false, confirmButtonText: '...', cancelButtonText: 'Kapat', reverseButtons: false
          }).then((result) => { });
        }  */
        

        
        this.monthlyinstallments[ 1 ] =  Math.round( this.workingfeeModelson * this.firstinstallmentrate / 100);
        deger = 0;
        for(var t = 2; t <= this.taksitaysayisi ; t++){
          
          
          this.monthlyinstallments[ t ] =  Math.round( (this.workingfeeModelson - (this.workingfeeModelson * (this.firstinstallmentrate / 100 ))) / (this.taksitaysayisi - 1) ); //ilk taksit hariç kalan taksitleri eşit böler
          deger = this.monthlyinstallments[ t ] + deger; //
        }
        
        this.monthlyinstallments[ this.taksitaysayisi ] =  this.workingfeeModelson - deger + this.monthlyinstallments[ this.taksitaysayisi ] - this.monthlyinstallments[ 1 ]; //son satırda kalan küsüratı ekler
        if(this.sayfaacik == 1 ) this.workingfeeinstallments();
      }
      
      
    }
    
    //this.sayfaacik = 0; // kaydet butonuna koşulları önemsemeksizin 2. basılmada çıkar..
    this.tablo();
    
    
   
  }

  ilktaksitdegismesi(){
    var deger = 0;
    if(this.monthlyinstallments[ 1 ] !== Math.round( this.workingfeeModelson * this.firstinstallmentrate / 100)){
      for(var t = 1; t <= this.taksitaysayisi ; t++){

        if(t !== 1 ){
          
          
          this.monthlyinstallments[ t ] =  Math.round( (this.workingfeeModelson - this.monthlyinstallments[ 1 ]) / (this.taksitaysayisi - 1) ); //ilk taksit hariç kalan taksitleri eşit böler
        }
        deger = this.monthlyinstallments[ t ] + deger; //

      }
      this.firstmonthtotalpaymentModel = this.monthlyinstallments[1];
      this.monthlyinstallments[ this.taksitaysayisi ] =  this.workingfeeModelson - deger + this.monthlyinstallments[ this.taksitaysayisi ]; //son satırda kalan küsüratı ekler
    }
    
  }

  k: any  = null;
  teslimdonemihesaplama(){
    this.deliveryperiodModel = null;
    if(this.aracadi == null ){
      this.modeladi = this.konutadi;
    }else if(this.konutadi ==  null){
      this.modeladi = this.aracadi;
    }
    
    this.teslimdetay.forEach(td =>{
      
      if(td.s.grupadi == this.grupadi && td.s.modeladi == this.modeladi) {
        
        if(td.s2.baslangic <= this.downpaymentrateModel && td.s2.bitis > this.downpaymentrateModel){

          
          if(td.s2.saybas <= this.numberofgroupsModel && td.s2.saybit >= this.numberofgroupsModel ){
            
            this.deliveryperiodModel = td.n;  
            this.teslimatdonemi = td.t2; 
            
          }else if( typeof td.s2.saybit == 'undefined' ){
          
          this.deliveryperiodModel = td.n;  
          this.teslimatdonemi = td.t2; 
          
          }
        }
      } 
    })  
      
    this.tablo();
    
  }

  workingfeeinstallments(){
    const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning', cancelButton: 'btn btn-danger' }, buttonsStyling: false});
    if(this.taksitaysayisi == 0 || typeof this.taksitaysayisi  == 'undefined') {
      swalWithBootstrapButtons.fire({
        title: 'Taksit Sayısı', html:'Lütfen Önce Taksit Sayısı Seçiniz' , type: 'warning', showCancelButton: true, showConfirmButton:false, confirmButtonText: '...', cancelButtonText: 'Kapat', reverseButtons: false
      }).then((result) => { });
      
      
      return;
    }
    this.modalService.open(this.myModal, { backdropClass: 'dark-modal', centered: true , backdrop: false ,  });
    
    this.sayfaacik = 1;
  }
  

  tablo(){
    
    var rows = [];
        var toplamodeme = 0;
        //peşinat satırı
        var thisdatenowa = new Date(this.installmentstartdateModelc);
        
        if(this.downpaymentamountModel > 0){
          toplamodeme = toplamodeme + this.downpaymentamountModel;

          var m = thisdatenowa.getMonth()+1,
          y=thisdatenowa.getFullYear(),
          d=thisdatenowa.getDate();
          thisdatenowa.setMonth( thisdatenowa.getMonth()+1 );
          var formatted = d +'/'+ (m<10?'0':'')+m + '/'+y;

          rows.push({
            donem : '#',
            tarih : formatted,
            dodeme : this.downpaymentamountModel,
            todeme : toplamodeme,
            tur : 'Proje Peşinatı'
          })
        }
        if(this.taksitsayisi == null) this.taksitsayisi = 0;
        if(this.taksitsayisi == 0)
        { 
          this.k = 1;
        }else {
          this.k = this.taksitsayisi;
        }
        
        
        var thisdatenowa = new Date(this.installmentstartdateModelc);
        // thisdatenowa.setDate(20);
        //ÇAlışma bedeli satırı
        for(i=1; i<=this.k; i++){

          var m = thisdatenowa.getMonth()+1,
          y=thisdatenowa.getFullYear(),
          d=thisdatenowa.getDate();
          thisdatenowa.setMonth( thisdatenowa.getMonth()+1 );
          var formatted = d +'/'+ (m<10?'0':'')+m + '/'+y;
          
          if(this.numberofinstallmentsModel > 0){
            this.firstmonthpaymentofworkfee = Math.round(this.workingfeeModelson / this.k);
            if(this.numberofinstallmentsModel >= 3 ){
              this.threemonthpaymentofworkfee = 3*this.firstmonthpaymentofworkfee;
            }
            if(this.numberofinstallmentsModel >= 12 ){
              this.twelvemonthpaymentofworkfee = 12*this.firstmonthpaymentofworkfee;
            }

          }
          if(this.k == 1){
            toplamodeme = toplamodeme + this.workingfeeModelson / this.k;
          }else{
            toplamodeme = toplamodeme + this.monthlyinstallments[i];
          }

          

          if(this.k == 1){
            rows.push({
              donem : '#',
              tarih : formatted,
              dodeme : this.workingfeeModelson,
              todeme : toplamodeme,
              tur : 'Çalışma Bedeli'
              
            })
          }else {
            rows.push({
              donem : '#',
              tarih : formatted,
              dodeme : this.monthlyinstallments[i],
              todeme : toplamodeme,
              tur : 'Çalışma Bedeli'
              
            })
          }
          
          
        }
        
        
        
        // Proje Taksitleri
        var thisdatenowaz = new Date(this.installmentstartdateModel);
        thisdatenowaz.setDate(20);
        var bg = this.k - 1;
        var taksit = this.firstinstallmentModel;
        var x = 1;
        var a = 1;
        
        var artis = '';
        var artisi = '';
        
        var taksitodeme = 0;
        var yillikartismiktari=0;
        
        var ml  = thisdatenowaz.getMonth() ,
            y   = thisdatenowaz.getFullYear(),
            d   = thisdatenowaz.getDate();
          thisdatenowaz.setMonth( thisdatenowaz.getMonth() );

          
          var toplamode = 0;
        for(var i=1 ; i <= 1000 ; i++){

          ml  = thisdatenowaz.getMonth() + 1,
          y   = thisdatenowaz.getFullYear(),
          d   = thisdatenowaz.getDate();

          thisdatenowaz.setMonth( thisdatenowaz.getMonth()+1 );

          var formatted = d +'/'+ (ml<10?'0':'')+ml + '/'+y;
          bg++;
          x = i;
          x %= 12;
          
          if(x == 1 && i > 1){
            
            if(this.yillikartis == 0){
              
            } 
            else {

              yillikartismiktari = a * (this.yillikartis * this.campaignpriceModel);
              artisi = '(Yıllık Artış)';
              a++;
            }
            
          }else{ artisi = '';}
          
          if(this.teslimatdonemi == i){
            this.pdfteslimtarihi = formatted;
            
            
            taksit = this.postdeliveryinstallmentsModel;
            artis = '(Teslim Dönemi)';
          }else { artis = ''}

          



          if(i<13){

            taksitodeme = taksit;
            

          }else {
            
            taksitodeme = taksit + yillikartismiktari;
            
          }
          
          toplamodeme = toplamodeme + Math.round(taksitodeme);
          
          if(toplamodeme > this.totalcostModel ){
            
            taksitodeme = this.totalcostModel - (toplamodeme  - Math.round(taksitodeme)); //burda tablodaki son taksiti yazıyo ve ynalış yazıyo
            toplamodeme = this.totalcostModel;
            x = 2000;
          }
          if(taksitodeme > 0){
            rows.push({
              donem : i +'. Ay', // onur 4
              tarih : formatted,
              dodeme : taksitodeme,
              todeme : toplamodeme,
              tur : 'Proje Taksitleri' + artis + artisi
            });
          }
          this.installmentfinishmonthModel = formatted;
          
          if(x == 2000) {
            break;
          }

          /* (insstartfor>0?(insstartfor-1):0) */
          
          // hesaplar
          if(this.teslimatdonemi == (i+1)){
            this.predeliverypayment = Math.round(toplamodeme - ( this.workingfeeModelson + this.downpaymentamountModel));
            
          } //teslimat öncesi ödeme
          
    
          if(i == 3){ 
            this.bimonthlypayment = Math.round(toplamodeme - ( this.workingfeeModelson + this.downpaymentamountModel ));
            
          } // üç aylık ödeme
    
          
          // firstinstallmentModel'    ---->>> ilk taksit
          if(12 < this.teslimatdonemi){
            if(i == 12){ 
              this.twelvemonthlypayments = Math.round(toplamodeme - ( this.workingfeeModelson + this.downpaymentamountModel )); // 12 aylık ödeme
              
              this.aftertwelvemonthlypayments = Math.round(this.totalcostModel - (this.downpaymentamountModel + this.twelvemonthlypayments + this.workingfeeModelson)); 
              
              // 12 ay sonrası ödeme
            } 
          }
          if(this.teslimatdonemi < i ){
            this.postdeliverypayment  = Math.round(this.totalcostModel - ( this.workingfeeModelson + this.downpaymentamountModel + this.predeliverypayment));
            
            // teslimat sonrası toplam ödeme
            
          }
          if(this.teslimatdonemi == i && (i - this.teslimatdonemi) == 0 ){
            this.pdfirstmonthlypayment = Math.round(toplamodeme - ( this.workingfeeModelson + this.downpaymentamountModel + this.predeliverypayment));
            // teslimat sonrası ilk ay toplam ödeme
          }      
    
          if(this.teslimatdonemi <= i && (i - this.teslimatdonemi) == 2 ){
            this.pdbimonthlypayment = Math.round(toplamodeme - ( this.workingfeeModelson + this.downpaymentamountModel + this.predeliverypayment));
            
            // teslimat sonrası ilk 3 ay toplam ödeme
          } 
          if(this.teslimatdonemi <= i && (i - this.teslimatdonemi) == 11 ){
            this.pdtwelvemonthlypayment = Math.round(toplamodeme - ( this.workingfeeModelson + this.downpaymentamountModel + this.predeliverypayment));
            
            // teslimat sonrası ilk 12 ay toplam ödeme 
          } 
          if(this.teslimatdonemi < i ){
            this.pdaftertwelvemonthlypayments = Math.round(this.totalcostModel - ( this.workingfeeModelson + this.predeliverypayment + this.downpaymentamountModel + this.pdtwelvemonthlypayment));
            
            // teslimat sonrası ilk 12 aydan sonra toplam ödeme 
          } 
           
        }
        
        this.tabledata = rows; // verileri tabloya yazar döngü her döndüğünde bir satır yazar

  }
  
  drawFormForEdit( values ){ 

    if(this.geteditformcounter == 10){
      
      if(values['housing'] > 0){ this.housingOptions.forEach(elm => { if(elm.i == values['housing'] ) this.housingOnChange(elm); }); }
        else if(values['car'] > 0){ this.carOptions.forEach(elm => { if(elm.i == values['car'] ) this.carOnChange(elm); }); }
        
        this.numberofgroupsModel          = values['numberofgroups'];

        this.groupModel = values['installmentgroup'];
        this.groupOptions.forEach(elm => { if(elm.i == values['installmentgroup'] ) this.housingGroupOnChange(elm); });

        
        this.installmentstartdateModel    = values['installmentstartdate'];
        this.installmentstartdateModelc   = values['installmentstartdatec'];
        this.installmentstartdateModelci  = values['installmentstartdatec'].split('-').reverse().join('/');
        
        this.tablo();
    }else{
      setTimeout(()=>{ this.drawFormForEdit( values ) },200);
    }
  }

  todaydate(){ 
    this.bugun = new Date();
    
    var m = this.bugun.getMonth()+1,
          y=this.bugun.getFullYear(),
          d=this.bugun.getDate(),
          e=this.bugun.getDate()+1;

          var todayss = y+'-'+(m<10?'0':'')+m+'-'+(d<10?'0':'')+d;
          this.todaydateonly = todayss;
          var offervaliditydatess = y+'-'+(m<10?'0':'')+m+'-'+(e<10?'0':'')+e;
          this.offervaliditydateonly = offervaliditydatess; 
  }


  ngOnDestroy(){
    if(this.formid !== 'new') this.listsubscribes.unsubscribe();
  }

  ngOnInit() { //tablo açıldığında yeniden verileri alır ve çizer tabloyu

    this.todaydate();
    this.columns = [
      {prop: 'donem' , name : 'Dönem'} ,
      {prop: 'tarih' , name : 'Tarih'} ,
      {prop: 'dodeme' , name : 'Dönem Ödeme' , cellTemplate: this.dodeme } ,
      {prop: 'todeme' , name : 'Toplam Ödeme' , cellTemplate: this.dodeme } ,
      {prop: 'tur' , name : 'Ödeme Türü'}
    ];
    
    this.aroute.paramMap.subscribe(params => {
      
      this.formid = params.get('id');

      this.firstopen = 0;
      
      if(this.formid !== 'new'){
        
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {
          
          const values = {};
          for(let k in this.pocuErrorHandlers){
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='downpaymentamount' || k=='downpaymentrate' || k=='offerstatus' ? 0:'');
          }
          this.userForm.setValue(values);
          
          this.monthlyinstallments = data.monthlyinstallments;
          
          this.drawFormForEdit( values );
          this.firstopen = 1;

        });
      }else{
        this.firstopen = 1;
      }
      
    }); 
    
  }
  


  submit(value) { //veritabına gönderme yapar

    if(this.formsubmitoperation == 1) return;

    if (this.userForm.invalid) {  this.userForm.markAllAsTouched(); return; }
    else{

      value.numberofinstallmentsvalue = this.taksitsayisi; // veritabanına, gösterimde kullanmak üzere parametreid ile birlikte sayıyı da gönderiyoruz
      value.deliveryperiodlastvalue   = this.teslimatdonemi;
      value.insertcompanyid           = this.pocu.userInfo.uComs[0];
      value.deliverydate              = this.pdfteslimtarihi;  
      value.annualincrease            = (this.yillikartis+'').replace(',','.');
      value.reportvalues              = {t1: this.firstmonthpaymentofworkfee, t3: this.threemonthpaymentofworkfee, t12: this.twelvemonthpaymentofworkfee,
                                        pinstop: this.predeliverypayment, pins3A: this.bimonthlypayment, pins12A: this.twelvemonthlypayments, pins1YS: this.aftertwelvemonthlypayments, pinsTStop: this.postdeliverypayment,
                                        pinsTS1A: this.pdfirstmonthlypayment, pinsTS3A: this.pdbimonthlypayment, pinsTS12A: this.pdtwelvemonthlypayment, pinsTS1YS: this.pdaftertwelvemonthlypayments } ;                 
      value.monthlyinstallments       = this.monthlyinstallments;
      
      this.formsubmitoperation = 1;
      if(this.formid == 'new'){
        this.pocu.createItem( value ).subscribe((response) => {
          this.formsubmitoperation = 0;
          if(response['result'] == 'OK'){
            this.toastr.success( 'Eklendi' );
            this.router.navigate(['/installmentcalc/calculates']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          this.formsubmitoperation = 0;
          if(response['result'] == 'OK'){
            this.toastr.success( 'Düzenlendi' );
            this.router.navigate(['/installmentcalc/calculates']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
          }
        });
      }
    }

  }

  cancel() {
    this.router.navigate(['/installmentcalc/calculates']);
  }

}

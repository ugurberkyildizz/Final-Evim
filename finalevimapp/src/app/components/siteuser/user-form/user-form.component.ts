import { Component, OnInit , TemplateRef, ViewEncapsulation , OnDestroy , ViewChild } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

 
export class UserFormComponent implements OnInit , OnDestroy {

  @ViewChild('DatatableComponent',{static: true}) orderhistorytable: DatatableComponent;
  @ViewChild("hdrTplOrderHistory", { static: true }) hdrTplOrderHistory: TemplateRef<any>;
  @ViewChild("hdrTplAccountStatus", { static: true }) hdrTplAccountStatus: TemplateRef<any>;
  @ViewChild("historyMoneyCell", { static: true }) historyMoneyCell: TemplateRef<any>;
  

  
  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  countryModel:any = [];
  cityModel:any = [];
  statusModel = 1;
  appAccountCodeModel:any;
  appCompanyNameModel:any;

  userindexes:any = [0];
  addressindexes:any = [0];
  defaultuserModel:any = 0;
  defaultaddressModel:any = 0;

  countryOptions:any = [];
  cityOptions:any = {};
  categoryOptions:any = [];
  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];
  userstatusOptions:any = [{i:1,n:'Aktif'},{i:2,n:'Pasif'}];
  addressstatusOptions:any = [{i:1,n:'Aktif'},{i:2,n:'Pasif'}];

  cityWait:any = {};

  public orderhistorycolumns = [];
  public orderhistorydata : any[];
  public orderhistorytemp = [];

  public accountstatuscolumns = [];
  public accountstatusdata : any[];
  public accountstatustemp = [];

  orderhistoryloading = false;
  

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    if(this.formid == 'new') this.countryModel.push( 215 );

    this.pocuErrorHandlers = {

      defaultuser : new FormControl('', Validators.required),
      defaultaddress : new FormControl('', Validators.required),
      taxoffice : new FormControl('', Validators.required),
      taxno : new FormControl('', Validators.required),
      discountrate  : new FormControl(''),
      companyname: new FormControl(''),
      accountcode: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl(''),
      adminnotes: new FormControl(''),
      status :  new FormControl('', Validators.required),
      
    };

    this.addDynUserFields( 0 , 0 );

    this.addDynAddressFields( 0 , 0 );

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.pocu.getJSONResult('countryList' , 0).subscribe(data => {
      this.countryOptions = data;
    });

    this.pocu.getJSONResult('paramList' , 9).subscribe( data => {
      this.categoryOptions = data.jsn;
    });

    this.orderhistorycolumns = [
      { prop: 'mc' , name: 'Ürün Kodu', sortable: true,  headerTemplate: this.hdrTplOrderHistory },
      { prop: 'mn' , name: 'Adı', sortable: true,  headerTemplate: this.hdrTplOrderHistory },
      { prop: 'dt' , name: 'Sipariş Tarihi', sortable: true, headerTemplate: this.hdrTplOrderHistory},
      { prop: 'qt' , name: 'Adet', sortable: true , headerTemplate: this.hdrTplOrderHistory},
      { prop: 'pr' , name: 'Tutar', sortable: true , headerTemplate: this.hdrTplOrderHistory, cellTemplate: this.historyMoneyCell},
      { prop: 'st' , name: 'Durum', sortable: true  , headerTemplate: this.hdrTplOrderHistory}
    ];

    this.accountstatusdata = [
      {'tt' : 'Cari Hesap','sn' : 0 , 'dt' : 1500 ,'sm':-1500},
      {'tt' : 'Fatura','sn' : 1000 , 'dt' : 400 ,'sm':600},
      {'tt' : 'Çek/Senet','sn' : 500 , 'dt' : 200 ,'sm':300},
      {'tt' : 'Banka','sn' : 0 , 'dt' : 0,'sm': 0},
      {'tt' : 'Genel','sn' : 0 , 'dt' : 0 ,'sm': 0},
      
    ];
    this.accountstatustemp = this.accountstatusdata;

    this.accountstatuscolumns = [
      { prop: 'tt' , name: 'Türü', sortable: true,  headerTemplate: this.hdrTplOrderHistory },
      { prop: 'sn' , name: 'Borç', sortable: true,  headerTemplate: this.hdrTplOrderHistory },
      { prop: 'dt' , name: 'Alacak', sortable: true, headerTemplate: this.hdrTplOrderHistory},
      { prop: 'sm' , name: 'Bakiye', sortable: true,  headerTemplate: this.hdrTplOrderHistory }
      
    ];

  }

  addDynUserFields( ind , action ){

    this.pocuErrorHandlers['userid__'+ind] = new FormControl('new');
    this.pocuErrorHandlers['name__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['surname__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['usertitle__'+ind] = new FormControl('');
    this.pocuErrorHandlers['userphone__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['useremail__'+ind] = new FormControl('');
    this.pocuErrorHandlers['username__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['userpassword__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['userstatus__'+ind] = new FormControl(1, Validators.required);
    
    if(action == 1) this.userForm = this.fb.group(this.pocuErrorHandlers);

  }

  addDynAddressFields( ind , action ){

    this.countryModel[ind] = 0;
    this.cityModel[ind] = 0;
    this.cityOptions[ind] = [];

    this.pocuErrorHandlers['addressid__'+ind] = new FormControl('new');
    this.pocuErrorHandlers['addressphone__'+ind] = new FormControl('');
    this.pocuErrorHandlers['addressemail__'+ind] = new FormControl('');
    this.pocuErrorHandlers['addresscountry__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['addresscity__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['addressdetail__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['addresstitle__'+ind] = new FormControl('', Validators.required);
    this.pocuErrorHandlers['addressstatus__'+ind] = new FormControl(1, Validators.required);
    
    
    if(action == 1) this.userForm = this.fb.group(this.pocuErrorHandlers);
    
  }

  ngOnDestroy(){
   // this.listsubscribes.unsubscribe();
  }

  ngOnInit() { 

    this.aroute.paramMap.subscribe(params => { 
      this.formid = params.get('id');
      if(this.formid !== 'new'){
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {

          this.appAccountCodeModel = data['accountcode'];
          this.appCompanyNameModel = data['companyname'];

          if( data['countusers'] > 0){
            for(var i=1; i <= data['countusers'] ; i++){ this.userindexes.push(i);  this.addDynUserFields( i , 0 ); }
          }

          if(data['addresscountry__0'] > 0){
            this.countryModel[0] = data['addresscountry__0'];
            if(data['addresscity__0'] > 0) this.cityModel[0] = data['addresscity__0'];
            this.onCountrySelected(0,0,0);
          }
          
          if( data['countaddrs'] > 0){
            for(var i=1; i <= data['countaddrs'] ; i++){
              this.addressindexes.push(i);
              this.addDynAddressFields( i , 0 );
              if(data['addresscountry__'+i] > 0){
                this.countryModel[i] = data['addresscountry__'+i];
                if(data['addresscity__'+i] > 0) this.cityModel[i] = data['addresscity__'+i];
                this.onCountrySelected(0,i,0);
              }
              
            }
          }


          this.userForm = this.fb.group(this.pocuErrorHandlers);

         const values = {};
         for(let k in this.pocuErrorHandlers){
           values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='defaultuser'  || k=='defaultaddress' || k=='status' ? 0:'');
         }

         this.userForm.patchValue(values);
          // this.userForm.setValue(values);
        });
      }
    }); 
    
  }
  
  onCountrySelected( vars , ind , isreset){
    this.cityOptions[ind] = [];
    if(isreset==1) this.cityModel[ind] = null;
    if(this.countryModel[ind] > 0){ // if(typeof vars !== 'undefined'){
      this.cityWait[ind] = true;
      this.pocu.getJSONResult('cityList' , this.countryModel[ind] ).subscribe(data => {        
        this.cityWait[ind] = false; this.cityOptions[ind] = data;
      });
    }
  }

  submit(value) {

    if (this.userForm.invalid) { this.userForm.markAllAsTouched(); return; }
    else{
      console.log(value);
      if(this.formid == 'new'){
        
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Kullanıcı eklendi' );
            this.router.navigate(['/siteuser/users']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Kullanıcı düzenlendi' );
            this.router.navigate(['/siteuser/users']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/siteuser/users']);
  }

  adduser(){

    var nextindex =  Math.max(...this.userindexes) + 1;
    this.userindexes.push( nextindex );

    this.addDynUserFields( nextindex , 1 );
 
    // this.userForm.patchValue( newControls );

  }

  addaddress(){

    var nextindex =  Math.max(...this.addressindexes) + 1;

    this.addressindexes.push( nextindex );
    this.addDynAddressFields( nextindex , 1 );

  }

  updateColFilterOrderHistory(event, prop) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.orderhistorytemp.filter(function(d) {
      var thisval=d[prop]+''; return thisval.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.orderhistorydata = temp;
  }

  updateColFilterAccountStatus(event, prop) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.accountstatustemp.filter(function(d) {
      var thisval=d[prop]+''; return thisval.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.accountstatusdata = temp;
  }

  getOrderHistory(){

    this.orderhistoryloading = true;

    this.pocu.editItem( {'getorderswithappcode':true , 'accountcode':''+this.appAccountCodeModel} , this.formid ).subscribe((response) => {

      this.orderhistoryloading = false;

      if(response['result'] == 'OK'){
        this.toastr.success( 'Bilgiler getirildi' );
        this.orderhistorydata = response['data'];
        this.orderhistorytemp = response['data'];

      }else{
        this.toastr.warning( 'Bir sorun oluştu' );
        console.log(response);
      }


    });

  }


  updateWithAccountCode(){

    this.pocu.editItem( {'updatewithappcode':true , 'accountcode':this.appAccountCodeModel} , this.formid ).subscribe((response) => {
      if(response['result'] == 'OK'){
        this.toastr.success( 'Kullanıcı getirildi' );
        var data = response['data'];

        if(data['addresscountry__0'] > 0){
          this.countryModel[0] = data['addresscountry__0'];
          if(data['addresscity__0'] > 0) this.cityModel[0] = data['addresscity__0'];
          this.onCountrySelected(0,0,0);
        }

        if( data['countaddrs'] > 0){
          for(var i=1; i <= data['countaddrs'] ; i++){
            this.addressindexes.push(i);
            this.addDynAddressFields( i , 0 );
            if(data['addresscountry__'+i] > 0){
              this.countryModel[i] = data['addresscountry__'+i];
              if(data['addresscity__'+i] > 0) this.cityModel[i] = data['addresscity__'+i];
              this.onCountrySelected(0,i,0);
            }
          }
        }

        this.userForm = this.fb.group(this.pocuErrorHandlers);

        const values = {};
         for(let k in this.pocuErrorHandlers){
           values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='defaultuser'  || k=='defaultaddress' || k=='status' ? 0:'');
         }

         this.userForm.patchValue(values);

      }else{
        this.toastr.warning( 'Bir sorun oluştu' );
        console.log(response);
      }
    });

  }

}

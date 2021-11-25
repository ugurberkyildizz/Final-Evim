import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { env } from 'process';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class SaleFormComponent implements OnInit , OnDestroy {

  math = Math;

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  addressModel = null;
  statusModel = 0;

  addressView : any = [];
  addressOptions:any = [];
  orderStatusOptions:any = [];
  productOptions:any = [];
  productFeatOptions:any = [];
  lastSelectedProductFeat:any = [];
  newProductForInsert:any = [];
  activeLanguages : any[];
  cartProducts : any[];
  productQtyModel:any = [];
  cartAllColors:any = [];
  cartAllProductCodes:any = [];
  taxModel:any = [];
  orderStatusOptionswithId:any = {};

  newproductModel:any;
  newproductfeatModel:any;

  orderValues : any = {};

  imageBaseUrl:any = this.pocu.base_path;


  taxOptions:any = [{i:1,n:'%1'},{i:2,n:'%2'},{i:8,n:'%8'},{i:10,n:'%10'},{i:20,n:'%20'},{i:25,n:'%25'},{i:30,n:'%30'},{i:50,n:'%50'}];
  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'}]; // ,{i:2,n:'İptal'}

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocuErrorHandlers = { 
      // parentcategoryid : new FormControl(''),
      cartaddressid :  new FormControl('', Validators.required),
      additionaldiscount :  new FormControl(''),
      lastorderstatus :  new FormControl(''),
      // subtax :  new FormControl('', Validators.required),
      approvalstatus :  new FormControl('', Validators.required)
    };

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.pocu.getJSONResult('paramList' , 18).subscribe( data => {
      this.orderStatusOptions = data.jsn;
      // this.orderStatusOptions.forEach(v=>{ this.orderStatusOptionswithId[v.i] = v; });
    });

  } 

  printDocument(){

    window.print();
    
  }

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  writeAddress(){
   
    if(this.addressModel > 0) this.addressView = this.orderValues.addrlist[ this.addressModel ];

  }

  removeFromCart( rowid ){

    this.productQtyModel[ rowid ] = 0;

  }

  ngOnInit() { 

    this.aroute.paramMap.subscribe(params => { 
      this.formid = params.get('id');
      if(this.formid !== 'new'){
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {

          this.orderValues    = data;
          this.addressOptions = data['addrselect'];
          this.addressModel   = data['cartaddressid'];
          this.cartProducts   = data['productlist'];

          this.cartProducts.forEach( prod => {
            if(!this.cartAllColors.includes(prod.colorname_view)) this.cartAllColors.push( prod.colorname_view );
            if(!this.cartAllProductCodes.includes(prod.productcode)) this.cartAllProductCodes.push( prod.productcode );
            this.productQtyModel[ prod.cartrowid ] = prod.featurequantity;
            this.taxModel[ prod.cartrowid ] = prod.taxpercentage;
            
          });

          this.writeAddress();
          
          const values = {};
          for(let k in this.pocuErrorHandlers){
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='parentcategoryid' || k=='approvalstatus' ? 0:'');
          }
          this.userForm.setValue(values);
        });
      }
    }); 
    
  }
  
  getProductsForAdd(){

    this.listsubscribes = this.pocu.getViewList({'productListForAddToCart':true}).subscribe( data => {
      this.productOptions = data;
    });

  }

  newProductListChange( evn ){

    this.productFeatOptions = [];
    var feats = evn.f;

    feats.forEach(feat => {
      var nm = evn.c+' - '+feat.cnm + ' ~ ('+feat.lnm+') ~ ' + evn.p + '₺' + (evn.d > 0 ? (' (+'+evn.d+'₺ indirim)'):'');
      delete(evn.f);
      this.productFeatOptions.push({'i':feat.fid , 'n': nm , 'evf':feat , 'evn':evn});
    });

    /*
    i: 135 , f: => array...{0: {S: 2, M: 2, L: 2}, cid: 208, fid: 265, cimg: "data:image/jpeg;...", cnm: "BEJ"}
    m: "files/thumbs/products/0/135/1593615649_135.jpg" , n: "S0003400" c: "Bluz" , p: 30 , d: 10
    */

  }

  newProductFeatChange( evn ){

    this.lastSelectedProductFeat = evn;

  }


  addProductsToCart(){

    // this.cartProducts.push();
    // this.lastSelectedProductFeat

    var ft = this.lastSelectedProductFeat , cnt = this.newProductForInsert.length;

    var nw = {
      'cartrowid' : 'new_'+cnt ,
      'featureid' : ft.i ,
      'imagedata' : ft.evf.cimg ,
      'mainimage': ft.evn.m,
      'lothtml' : ft.evf.lht,
      'productcode' : ft.evn.n,
      'productname' : ft.evn.c,
      'productqty' : ft.evf.qty,
      'piecefinalprice' : ft.evn.p ,
      'totalfinalprice' : ft.evn.p * ft.evf.qty ,
      'piecediscount' : ft.evn.d , 
      'colorname_view' : ft.evf.cnm
    };

    this.productQtyModel[ 'new_'+cnt ] = 1;
    this.taxModel[ 'new_'+cnt ] = 8;

    this.newProductForInsert.push(nw);

    this.cartProducts.push(nw);

    this.newproductModel = null;
    this.newproductfeatModel = null;
    this.lastSelectedProductFeat = [];

    /*
    evf: {cid: 223, fid: 266, lot: "S:2 , M:2 , L:2", qty: 6, cimg: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…rLfJnL0unoEcNj3AatYEjZOQAQuXbFuZwUTX0AAq8QACT/9k=", …}
    evn: {i: 135, n: "S0003400" , 'c' : bluz , p: 30, d: 10, m: "files/thumbs/products/0/135/1593615649_135.jpg"}
    i: 266
    n: "EKRU ~ (S:2 , M:2 , L:2) ~ 30₺ (+10₺ indirim)"
    */

  }

  

  submit(value) {

    value['producttax']  = this.taxModel;
    value['productqty']  = this.productQtyModel;
    value['newproducts'] = this.newProductForInsert;
    
    if (this.userForm.invalid) { return; }
    else{

      if(this.formid == 'new'){
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Eklendi' );
            this.router.navigate(['/orders/sales']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Düzenlendi' );
            window.location.reload();
            // this.router.navigate(['/orders/sales']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/orders/sales']);
  }

}

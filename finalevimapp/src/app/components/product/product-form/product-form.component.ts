import { Component, OnInit , ViewEncapsulation , OnDestroy, AfterViewInit ,  Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { dragula , DragulaService } from 'ng2-dragula';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm , FormArray } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../shared/services/auth.service';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

import { PozitifcubeFileService } from '../../../shared/services/pozitifcube-file.service';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProductFormComponent implements OnInit , OnDestroy {

  public subs = new Subscription();

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;
  public userdata:any = [];

  formid : any;
  companyid : number;
  priceModel = 0;
  categoriesModel = null;
  brandModel = null;
  featuresLlist :any = [];
  colorsModel :any = [];
  // seriesModel = null;
  statusModel = 0;
  discounttypeModel = 1;
  imageColorModel:any = [];

  categoryOptions:any = [];
  brandOptions:any = [];
  // seriesOptions:any = [];
  colorsOptions:any = [];
  colorsOptionsWithId:any = [];
  activeLanguages : any[];

  defaulttextureurl = 'assets/images/productdef.jpg';

  subfeatureimagesModel:any = [];

  imageBaseUrl:any = this.pocu.base_path;
  imageList:any = [];
  mainImageUrl:any = '';
  
  imageSortList:any = [];
  imageColorList:any = [];

  gotopreview:any = 0;

  savedisabled:any = false;

  shoenumbers:any = [35,36,37,38,39,40,41,42,43,44,45,46,47];

  editorConfig = { editable: true, spellcheck: true, minHeight: '150px', translate: 'no', toolbar: [ ["bold", "italic", "underline", "superscript", "subscript"], ["color" , "justifyLeft", "justifyCenter", "justifyRight", "justifyFull"], ["delete", "removeFormat", "undo"], ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"] , ["code"] ] };

  discounttypeOptions:any = [{i:2,n:'%'},{i:1,n:'Tutar'}];
  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];

  deadlineOptions:any = [{i:1,n:'Hemen'},{i:3,n:'3-5 Gün'},{i:7,n:'7-10 Gün'},{i:15,n:'15-20 Gün'},{i:30,n:'30+ Gün'}];

  public uploader: FileUploader = new FileUploader({ url: this.pocu.loggedInPath , isHTML5: true , headers : this.pocu.loggenInHttpOptionsArray() });
  public hasBaseDropZoneOver: boolean = false;

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService , private pocuFile:PozitifcubeFileService , private dragulaService: DragulaService, public authService: AuthService) {

    this.subs.add(dragulaService.drop()
      .subscribe(({ el }) => {
        this.imageSortList = [].map.call(document.querySelectorAll('.image-gallery input.imageinputlist'),function(e){ return e.value; });
        this.imageColorList = [].map.call(document.querySelectorAll('.image-gallery input.imagecolorlist'),function(e){ return e.value; });
     })
    );

    this.pocuErrorHandlers = { 
      categories : new FormControl('', Validators.required),
      brand : new FormControl('', Validators.required),
      colors : new FormControl('', Validators.required),
      // productprice : new FormControl({value: '', disabled: true}), // , Validators.required
      productprice : new FormControl('', Validators.required), // , Validators.required
      discounttype : new FormControl(''),
      productdiscount : new FormControl(''),
      deadline : new FormControl(''),
      isoutofstocksale : new FormControl(''),
      isfeaturedproduct : new FormControl(''),
      isnewproduct : new FormControl(''),
      ischoiceforyou : new FormControl(''),
      productcode : new FormControl('', Validators.required), // , Validators.required
      // productstock : new FormControl({value: '', disabled: true}), // , Validators.required
      productstock : new FormControl('', Validators.required), // , Validators.required
      status :  new FormControl('', Validators.required),
    };

    this.activeLanguages = pocu.activeLanguages;

    this.pocu.activeLanguages.forEach(lang => {

      var formGroup:FormGroup = this.fb.group({
        productname:new FormControl(''),
        productminname:new FormControl(''),
        seourl:new FormControl(''),
        metadesc:new FormControl(''),
        summary:new FormControl(''),
        htmlcontent:new FormControl(''),
        technicalcontent:new FormControl('')

      });

      this.pocuErrorHandlers[ lang.cd ] = formGroup;

    });

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.pocu.getJSONResult('paramList' , 10).subscribe( data => {
      this.colorsOptions = data.jsn;
      this.colorsOptions.forEach(v=>{ this.colorsOptionsWithId[v.i] = v; });
      
    });

    this.listsubscribes = this.pocu.getJSONResult('productCategoryList' , 0).subscribe( data => {
      this.categoryOptions = data;
    });

    this.pocu.getJSONResult('productBrandList' , 0).subscribe( data => {
      this.brandOptions = data;
    });
    /*
    this.pocu.getJSONResult('paramList' , 11).subscribe( data => {
      this.seriesOptions = data.jsn;
    });
    */
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      let data = JSON.parse(response); //success server response
      this.imageList.push(  data.imgsrc );
      if(data.mainimg != ''){ this.mainImageUrl = data.mainimg; }
    }

    this.uploader.onCompleteAll = () => { console.log('complete'); };

    // upload sırasında ürün idsini gönderir
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => { form.append('productid', this.formid ); };

  }

  changeImageColor(ind , colord){
    if(this.subfeatureimagesModel[ colord.i ].length > 100){
      this.imageColorModel[ind] = colord.i;
      setTimeout(function(){
        this.imageSortList = [].map.call(document.querySelectorAll('.image-gallery input.imageinputlist'),function(e){ return e.value; });
        this.imageColorList = [].map.call(document.querySelectorAll('.image-gallery input.imagecolorlist'),function(e){ return e.value; });
      },100);
      
    }else this.toastr.warning( 'Deseni yüklenmemiş bir renk, ürün görseline tanımlanamaz !' );
  }

  colorsListChange(tp){

    if(this.colorsModel.length > 0){ //  && this.formid !== 'new'

      this.colorsModel.forEach( id => {
        if(!(('colorfeat_'+id) in this.pocuErrorHandlers)){

          if(!this.subfeatureimagesModel[id]) this.subfeatureimagesModel[id] = this.defaulttextureurl;

          var shoenumfields = {};
          this.shoenumbers.forEach(num => { shoenumfields[ 'num_'+num ] = new FormControl(''); });
          var shoeNumGroup:FormGroup = this.fb.group( shoenumfields );

          let formGroup:FormGroup = this.fb.group({
            // seriesid:new FormControl(null),
            productdiscount : new FormControl(''),
            deadline : new FormControl(null),
            isoutofstocksale : new FormControl(''),
            seriesname:new FormControl({value: '', disabled: true}),
            productqty:new FormControl({value: '', disabled: true}),
            substock:new FormControl({value: '', disabled: true}),
            subinfo:new FormControl({value: '', disabled: true}),
            shoenums:shoeNumGroup
            // imagedata:new FormControl(''),
          });

          
          // var shoeNumGroup:FormGroup = this.fb.group( shoenumfields );
          // this.pocuErrorHandlers[ 'shoenums' ] = shoeNumGroup;
          
          this.pocuErrorHandlers[ 'colorfeat_'+id ] = formGroup;
        }
      });

      this.userForm = this.fb.group(this.pocuErrorHandlers);

    }

  }


  ngOnDestroy(){

    this.listsubscribes.unsubscribe();
    this.dragulaService.destroy('HANDLES');

  }

  ngOnInit() { }

  ngAfterViewInit(){

    this.userdata = this.authService.userData;

    this.aroute.paramMap.subscribe(params => { 

      this.formid = params.get('id');
      this.companyid = Number( params.get('company') );
      // kullanıcının yetkisi dışındaki bir firmaya linkten id değiştirerek kayıt eklemesini engeller
      if(!this.userdata.uComs.includes(this.companyid)){ this.toastr.warning( 'Hatalı bir giriş' ); this.router.navigate(['/product/products']); }

      if(this.formid !== 'new'){
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {

          const values = {};
          for(let k in this.pocuErrorHandlers){
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='categoryid' || k=='status' ? 0:'');
          }
 
          this.userForm.setValue(values);
          this.mainImageUrl = data['mainimage'];
          this.imageList = data['imagelist'];
          this.imageSortList = data['imagelist'];
          this.imageColorModel = data['imagecolorlist'];
          this.imageColorList = data['imagecolorlist'];

          this.colorsListChange(1);
          
          if(this.colorsModel.length > 0){
            const featvalues = {};
            this.colorsModel.forEach( id => {
              if(data['colorfeat_'+id]){
                featvalues['colorfeat_'+id] = data['colorfeat_'+id];
                // if(data['colorfeat_'+id]['imagedata']) this.subfeatureimagesModel[id] = data['colorfeat_'+id]['imagedata'];
              }
            });
            this.userForm.patchValue(featvalues);
          }
        });
      }
    });  
  }
  

  activateDisableControl(){

    var returnval = false , selectedColors = 0;

    if(this.statusModel == 1){

      if(this.priceModel == 0){      returnval = true; this.toastr.warning( 'Fiyat sıfır(0) olamaz. Ürün sisteminde güncellendiğinde burada da güncellenir' ); }
      if(this.mainImageUrl == ''){   returnval = true; this.toastr.warning( 'Ana resim yok.' ); }
      if(this.imageList.length < 1){ returnval = true; this.toastr.warning( 'En az bir görsel yüklenmelidir.' ); }

      // görsellerin renk idleri
      // this.imageColorModel.forEach( (c,v) => { if(c > 0) selectedColors++; });
      // if(this.imageList.length !== selectedColors){ returnval = true; this.toastr.warning( 'Yüklü her görselin rengi seçili olmalıdır' ); }

    }

    return returnval; // if disabled, return true

  }

  mainImg( img ){
    const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false});
    swalWithBootstrapButtons.fire({
      title: 'Website', text: "Listeleme görseli olarak seçilsin mi?",
      type: 'question', showCancelButton: true, confirmButtonText: 'Ana Resim Yap', cancelButtonText: 'Vazgeç', reverseButtons: true
    }).then((result) => {
      if (result.value) {
        var filename = img.split('/').pop().split('#')[0].split('?')[0];
        this.pocu.editItem( { 'selectmainimage' : true , 'imagename' : filename } , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.mainImageUrl = img;
            this.toastr.success( 'Görsel düzenlendi' );
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    });
  }

  removeImg( img ){

    if( this.mainImageUrl == img ){
      this.toastr.warning( 'Ana resim silinemez' );
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-danger', cancelButton: 'btn btn-warning' }, buttonsStyling: false});
    swalWithBootstrapButtons.fire({
      title: 'Resmi Sil', text: "Mevcut görsel kalıcı olarak silinsin mi?",
      type: 'question', showCancelButton: true, confirmButtonText: 'Görseli Sil', cancelButtonText: 'Vazgeç', reverseButtons: true
    }).then((result) => {
      if (result.value) {
        var filename = img.split('/').pop().split('#')[0].split('?')[0];
        this.pocu.editItem( { 'removeimage' : true , 'imagename' : filename } , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Görsel silindi' );
            var imgindex = this.imageList.indexOf( response['rmvsrc'] );
            this.imageList.splice(imgindex , 1);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  submitandpreview(value){

    this.gotopreview = 1;
    this.submit(value);

  }
  

  submit(value) {
    // O SEKMEDEYKEN KAYDEDİLMESİ GEREKİYOR !!!
    // SEKME DEĞİŞTİĞİNDE BU KODLAR ÇALIŞMIYOR !!!
    //    BU VALUE DEĞİŞKENLERİNİ DEĞİŞTİRİRSEK İSE
    /* if(document.querySelectorAll('.image-gallery input.imageinputlist').length>0){
      value.imagecolorlist = [].map.call(document.querySelectorAll('.image-gallery input.imagecolorlist'),function(e){ return e.value; });
      value.imagelist = [].map.call(document.querySelectorAll('.image-gallery input.imageinputlist'),function(e){ return e.value; });
    } */

    if(this.activateDisableControl()) return; // aktifleştirilmesine engel bir şey var mı?

    //console.log(value); return;
    if (this.userForm.invalid) { this.userForm.markAllAsTouched(); return; }
    else{

      if(this.formid == 'new'){
        value['companyid'] = this.companyid;
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Eklendi' );
            if(response['productid'] !== 'empty'){
              this.toastr.success( 'Artık diğer detayları girebilirsiniz' );
              this.router.navigate(['/product/productform/'+response['productid']+'/'+this.companyid ]); // .then(() => {  window.location.reload(); });
            }else if(this.gotopreview == 0) this.router.navigate(['/product/products']);
          }else{
            this.gotopreview = 0;
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{

        if(this.imageSortList.length > 0) value.imagelist = this.imageSortList;
        if(this.imageColorList.length > 0) value.imagecolorlist = this.imageColorList;

        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Düzenlendi' );
            if(this.gotopreview == 0) this.router.navigate(['/product/products']);
            else if(this.gotopreview == 1) this.router.navigate(['/product/productpreview/'+this.formid]);
          }else{
            this.gotopreview = 0;
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  readTextureUrl(event: any , ind) {
    
    if (event.target.files.length === 0) return;
    //Image upload validation
    var txMimeType = event.target.files[0].type;
    if (txMimeType.match(/image\/*/) == null) return;
    // Image upload
    var txreader = new FileReader();
    txreader.readAsDataURL(event.target.files[0]);
    txreader.onload = (_event) => {
      this.pocuFile.imageFixedSize( txreader , 'image/jpeg' , 40 , 40 , 0.5).subscribe(data => {
        if(data !== false){
          this.subfeatureimagesModel[ind] = data;
        }else{ this.pocu.toastr.error('Görsel tanımlanamadı'); }
      });
    }
  }

  cancel() {
    this.router.navigate(['/product/products']);
  }

}

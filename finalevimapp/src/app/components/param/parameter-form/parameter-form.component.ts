import { Component, OnInit , ViewEncapsulation , OnDestroy} from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

@Component({
  selector: 'app-parameter-form',
  templateUrl: './parameter-form.component.html',
  styleUrls: ['./parameter-form.component.scss']
})
export class ParameterFormComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  parameterGroupModel = null;
  statusModel = 0;
  paramGroupOptions:any = [];
  selectval1Options:any = [];
  selectval2Options:any = [];
  groupval1Options:any = [];
  groupval2Options:any = [];
  multival1Options:any = [];
  multival2Options:any = [];
  multigroupval1Options:any = [];
  multigroupval2Options:any = [];
  paramGroupDetail:any = [];
  statusOptions:any = [{i:0,n:'Pasif'},{i:1,n:'Aktif'}];
  activeLanguages : any[];

  stringval1Model:any;
  stringval1iscolor:any;

  otherModuleOptions:any = [{i:'pages',v:'page',n:'Sayfa'},
                            {i:'contentcategories',v:'contentcategory',n:'İçerik Kategori'},
                            {i:'productcategories',v:'productcategory',n:'Ürün Kategori'}];
  otherModuleDataOptions:any = [];
  otherModuleView = false;
  /*module_pageOptions:any = [];
  module_contentcategoryOptions:any = [];
  module_productcategoryOptions:any = [];*/


  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocuErrorHandlers = {
      parametergroup: new FormControl('', Validators.required),
      stringval1: new FormControl('', Validators.minLength(1)),
      stringval2: new FormControl('', Validators.minLength(1)),
      integerval1: new FormControl('', Validators.minLength(1)),
      integerval2: new FormControl('', Validators.minLength(1)),
      selectval1: new FormControl(''),
      selectval2: new FormControl(''),
      selectgroupval1: new FormControl(''),
      selectgroupval2: new FormControl(''),
      multival1: new FormControl(''),
      multival2: new FormControl(''),
      multigroupval1: new FormControl(''),
      multigroupval2: new FormControl(''),
      status :  new FormControl('', Validators.required)
    }

    this.otherModuleOptions.forEach(opt => {
      // this.otherModuleDataOptions[opt.i] = [];
      this.pocuErrorHandlers[ 'module_'+opt.v+'val' ] = new FormControl('');
    })

    this.activeLanguages = pocu.activeLanguages;

    this.pocu.activeLanguages.forEach(lang => {
      this.pocuErrorHandlers[ 'paramname_'+lang.cd ] = new FormControl('', Validators.required);
    })

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.listsubscribes = this.pocu.getJSONResult('paramGroupList' , 0).subscribe(data => {
      this.paramGroupOptions = data.jsn;
    });

  }

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  ngOnInit() {
    this.aroute.paramMap.subscribe(params => { 
      this.formid = params.get('id');
      if(this.formid !== 'new'){
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {

          const values = {};
          for(let k in this.pocuErrorHandlers){
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='status' ? 0:''); // let child = this.pocuErrorHandlers[k];
          }
          this.userForm.setValue(values);

          if(values['stringval1'] != ''){ this.stringval1Model = values['stringval1']; this.onStringVal1Change(); }

          if(data.parametergroup > 0){
            this.onGroupSelected();
          }

        });
      }
    }); 
  }

  onGroupSelected(){

    if(this.parameterGroupModel !== null){

      this.otherModuleDataOptions = [];

      this.listsubscribes = this.pocu.getJSONResult('paramGroupDetail' , this.parameterGroupModel).subscribe(data => {

        this.paramGroupDetail = data;

        if(data.selectparam1){
          this.listsubscribes = this.pocu.getJSONResult('paramList' , data.selectparam1).subscribe(sdata => {
            this.paramGroupDetail.selectparam1gn = sdata.gn; this.selectval1Options = sdata.jsn;
          });
        }

        if(data.selectparam2){
          this.listsubscribes = this.pocu.getJSONResult('paramList' , data.selectparam2).subscribe(sdata => {
            this.paramGroupDetail.selectparam2gn = sdata.gn; this.selectval2Options = sdata.jsn;
          });
        }

        if(data.multiparam1){
          this.listsubscribes = this.pocu.getJSONResult('paramList' , data.multiparam1).subscribe(sdata => {
            this.paramGroupDetail.multiparam1gn = sdata.gn; this.multival1Options = sdata.jsn;
          });
        }

        if(data.multiparam2){
          this.listsubscribes = this.pocu.getJSONResult('paramList' , data.multiparam2).subscribe(sdata => {
            this.paramGroupDetail.multiparam2gn = sdata.gn; this.multival2Options = sdata.jsn;
          });
        }

        if(data.selectgroup1){
          this.listsubscribes = this.pocu.getJSONResult('paramGroupList' , data.selectgroup1).subscribe(sdata => {
            this.paramGroupDetail.selectgroup1gn = sdata.gn; this.groupval1Options = sdata.jsn;
          });
        }

        if(data.selectgroup2){
          this.listsubscribes = this.pocu.getJSONResult('paramGroupList' , data.selectgroup2).subscribe(sdata => {
            this.paramGroupDetail.selectgroup2gn = sdata.gn; this.groupval2Options = sdata.jsn;
          });
        }

        if(data.multigroup1){
          this.listsubscribes = this.pocu.getJSONResult('paramGroupList' , data.multigroup1).subscribe(sdata => {
            this.paramGroupDetail.multigroup1gn = sdata.gn; this.multigroupval1Options = sdata.jsn;
          });
        }

        if(data.multigroup2){
          this.listsubscribes = this.pocu.getJSONResult('paramGroupList' , data.multigroup2).subscribe(sdata => {
            this.paramGroupDetail.multigroup2gn = sdata.gn; this.multigroupval2Options = sdata.jsn;
          });
        }

        if(data.module_pages){
          this.listsubscribes = this.pocu.getJSONResult('cmsPageList' , 0).subscribe(sdata => {
            this.otherModuleDataOptions['pages'] = sdata;
            this.otherModuleView = true;
          });
        }

        if(data.module_contentcategories){
          this.listsubscribes = this.pocu.getJSONResult('cmsCategoryList' , 0).subscribe(sdata => {
            this.otherModuleDataOptions['contentcategories'] = sdata;
            this.otherModuleView = true;
          });
        }

        if(data.module_productcategories){
          this.listsubscribes = this.pocu.getJSONResult('productCategoryList' , 0).subscribe(sdata => {
            this.otherModuleDataOptions['productcategories'] = sdata;
            this.otherModuleView = true;
          });
        }

      });
    }else{
      this.paramGroupDetail = [];
    }
  }

  onStringVal1Change(){
    if(this.stringval1Model.substr(0,4) == 'rgb(' || this.stringval1Model.substr(0,15) == 'linear-gradient'){
      this.stringval1iscolor = this.stringval1Model;
    }else this.stringval1iscolor = false;
  }

  submit(value) {

    if (this.userForm.invalid) { return; }
    else{
      if(this.formid == 'new'){
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Eklendi' );
            this.router.navigate(['/param/parameters']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Düzenlendi' );
            this.router.navigate(['/param/parameters']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
          }
        }); 
      }
 
    }

  }

  cancel() {
    this.router.navigate(['/param/parameters']);
  }


}

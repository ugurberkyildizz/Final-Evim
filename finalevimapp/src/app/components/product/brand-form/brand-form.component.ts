import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class BrandFormComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  companyModel = null;
  statusModel = 0;

  companyOptions:any = [];

  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocuErrorHandlers = { 
      brandname: new FormControl('', Validators.required),
      // companyid: new FormControl('', Validators.required),
      status :  new FormControl('', Validators.required)
    };

    this.userForm = this.fb.group(this.pocuErrorHandlers);

   /*  this.listsubscribes = this.pocu.getJSONResult('adminCompanyList' , 0).subscribe( data => {
      this.companyOptions = data;
    }); */

  }

  ngOnDestroy(){
    // this.listsubscribes.unsubscribe();
  }

  ngOnInit() { 

    this.aroute.paramMap.subscribe(params => { 
      this.formid = params.get('id');
      if(this.formid !== 'new'){
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {
          const values = {};
          for(let k in this.pocuErrorHandlers){
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='identitycheck' || k=='status' ? 0:'');
          }
          this.userForm.setValue(values);
        });
      }
    }); 
    
  }
  

  submit(value) {

    if (this.userForm.invalid) { return; }
    else{

      if(this.formid == 'new'){
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Eklendi' );
            this.router.navigate(['/product/brands']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Düzenlendi' );
            this.router.navigate(['/product/brands']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/product/brands']);
  }

}

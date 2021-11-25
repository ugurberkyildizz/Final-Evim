import { Component, OnInit , ViewEncapsulation , OnDestroy} from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  
  statusModel = 0;
  paramGroupOptions:any = [];
  statusOptions:any = [{i:0,n:'Pasif'},{i:1,n:'Aktif'}];

  moduleStatusOptions:any = [{i:0,n:'Yok'},{i:1,n:'Var'}];
  otherModuleOptions:any = [{i:'pages',n:'Sayfalar'},{i:'contentcategories',n:'İçerik Kategorileri'},{i:'productcategories',n:'Ürün Kategorileri'}];
  moduleStatusModel:any = [];
  activeLanguages : any[];

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocuErrorHandlers = {
      parentgroupid: new FormControl(''),
      groupcode: new FormControl('', [Validators.required, Validators.minLength(2)]),
      stringname1: new FormControl('', Validators.minLength(2)),
      stringname2: new FormControl('', Validators.minLength(2)),
      integername1: new FormControl('', Validators.minLength(2)),
      integername2: new FormControl('', Validators.minLength(2)),
      selectparam1: new FormControl(''),
      selectparam2: new FormControl(''),
      selectgroup1: new FormControl(''),
      selectgroup2: new FormControl(''),
      multiparam1: new FormControl(''),
      multiparam2: new FormControl(''),
      multigroup1: new FormControl(''),
      multigroup2: new FormControl(''),
      status :  new FormControl('', Validators.required)
    }

    
    this.otherModuleOptions.forEach(opt => {
      this.moduleStatusModel[opt.i] = 0;
      this.pocuErrorHandlers[ 'module_'+opt.i ] = new FormControl('');
    })

    this.activeLanguages = pocu.activeLanguages;
    
    this.pocu.activeLanguages.forEach(lang => {
      this.pocuErrorHandlers[ 'groupname_'+lang.cd ] = new FormControl('', Validators.required);
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

            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='module_pages' || k=='status' ? 0:'');
            // values[k] = data[k];
          }
          //this.userForm.patchValue(values);
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
            this.router.navigate(['/param/groups']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Düzenlendi' );
            this.router.navigate(['/param/groups']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
          }
        }); 
      }
 
    }

  }

  cancel() {
    this.router.navigate(['/param/groups']);
  }

}

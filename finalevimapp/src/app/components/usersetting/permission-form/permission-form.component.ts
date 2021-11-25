import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

type UserFields = 'name' | 'surname' | 'phone' | 'profileImg' | 'identityno' | 'email' | 'birthdate' | 'country' | 'city' | 'useraccessgroup' | 'identitycheck' | 'status';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-user-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class PermissionFormComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  userPagesChecked : any = [];
  userPagesOptions : any = [];
  accessgroupstatusOptions : any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];

  accessgroupstatusModel = 0;

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocuErrorHandlers = {
      accessgroupname: new FormControl('', Validators.required),
      accessgroupstatus :  new FormControl('', Validators.required),
      defaultroutepath: new FormControl('', Validators.required),
    };

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.pocu.getJSONResult('allPagesList' , 0).subscribe(data => {
      this.userPagesOptions = data;
      this.userPagesOptions.forEach(optv => { if(this.userPagesChecked.indexOf(optv.i) > -1){ optv.chk=1; } });
    });

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
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='accessgroupstatus' ? 0:'');
          }
          this.userForm.setValue(values);
          this.userPagesChecked = data['accessiblepages'];
          this.userPagesOptions.forEach(optv => { if(this.userPagesChecked.indexOf(optv.i) > -1){ optv.chk=1; } });
        });
      }
    }); 
    
  }

  accessiblepageChange( value , event ){
    this.userPagesOptions.forEach(optv => { if(optv.i == value){ 
      if(event.target.checked){ optv.chk=1; this.userPagesChecked.push(value); }
      else{ delete(optv.chk); this.userPagesChecked.splice( this.userPagesChecked.indexOf(value) , 1); }
    }});
  }
  
  submit(value) {

    if (this.userForm.invalid) { return; }

    else{

      value.accessiblepages = this.userPagesChecked;
      
      if(this.formid == 'new'){
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Yetki eklendi' );
            this.router.navigate(['/usersetting/permissions']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Yetki düzenlendi' );
            this.router.navigate(['/usersetting/permissions']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/usersetting/permissions']);
  }

}

import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

type UserFields = 'name' | 'surname' | 'phone' | 'profileImg' | 'identityno' | 'email' | 'birthdate' | 'country' | 'city' | 'useraccessgroup' | 'identitycheck' | 'status';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class UserFormComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  countryModel = 215;
  cityModel = null;
  userAccessGroupModel = null;
  identitycheckModel = 0;
  userstatusModel = 0;
  passwordModel = '';

  countryOptions:any = [];
  cityOptions:any = [];
  companyOptions:any = [];
  userAccessGroupOptions:any = [];
  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];
  identitycheckOptions:any = [{i:0,n:'Belirsiz'},{i:1,n:'Doğru'},{i:2,n:'Hatalı'}];

  cityWait = false;

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocuErrorHandlers = {
      // queryid : new FormControl(''),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      identityno: new FormControl('', Validators.minLength(11)),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      useraccessgroup :  new FormControl('', Validators.required),
      identitycheck :  new FormControl('', Validators.required),
      usercompanies :  new FormControl(''),
      status :  new FormControl('', Validators.required),
      password : new FormControl(Validators.minLength(6))
    };

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.pocu.getJSONResult('countryList' , 0).subscribe(data => {
      this.countryOptions = data;
      if(this.countryModel > 0){
        this.cityWait = true;
        this.pocu.getJSONResult('cityList' , this.countryModel ).subscribe(data => {
          this.cityWait = false; this.cityOptions = data;
        });
      }
    });

    this.listsubscribes = this.pocu.getJSONResult('adminCompanyList' , 0).subscribe( data => {
      this.companyOptions = data;
      
    });

    this.listsubscribes = this.pocu.getJSONResult('userAccessGroupList' , 0).subscribe(data => {
      this.userAccessGroupOptions = data;
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
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='identitycheck' || k=='status' ? 0:'');
          }
          values['birthdate'] = values['birthdate'].substr(8,2)+values['birthdate'].substr(5,2)+values['birthdate'].substr(0,4);
          this.userForm.setValue(values);
        });
      }
    }); 
    
  }
  
  onCountrySelected( vars ){
    this.cityOptions = [];
    this.cityModel = null;
    if(this.countryModel > 0){ // if(typeof vars !== 'undefined'){
      this.cityWait = true;
      this.pocu.getJSONResult('cityList' , this.countryModel).subscribe(data => {
        this.cityWait = false; this.cityOptions = data;
      });
    }
  }

  submit(value) {

    if (this.userForm.invalid) { return; }
    else{

      value.birthdate = value.birthdate.substr(4,4)+'-'+value.birthdate.substr(2,2)+'-'+value.birthdate.substr(0,2);

      if(this.formid == 'new'){
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Kullanıcı eklendi' );
            this.router.navigate(['/usersetting/users']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Kullanıcı düzenlendi' );
            this.router.navigate(['/usersetting/users']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/usersetting/users']);
  }

}

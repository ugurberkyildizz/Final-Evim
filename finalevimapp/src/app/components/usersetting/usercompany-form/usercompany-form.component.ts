import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

// type UserFields = 'name' | 'surname' | 'phone' | 'profileImg' | 'identityno' | 'email' | 'birthdate' | 'country' | 'city' | 'useraccessgroup' | 'identitycheck' | 'status';
// type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-usercompany-form',
  templateUrl: './usercompany-form.component.html',
  styleUrls: ['./usercompany-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class UserCompanyFormComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  countryModel = 215;
  cityModel = null;
  statusModel = 0;
  accountingsoftwareModel = 0;

  languageOptions : any = [];

  countryOptions:any = [];
  cityOptions:any = [];
  accountingsoftwareOptions:any = [];
  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];

  cityWait = false;

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocu.activeLanguages.forEach(lang => {
      this.languageOptions.push({i:lang.cd,n:lang.sf});
    });

    this.pocuErrorHandlers = {
      // queryid : new FormControl(''),
      companyname: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      taxinfo: new FormControl('', Validators.required),
      accountingsoftware: new FormControl(''),
      accountingsoftwarejson: new FormControl(''),
      accountingsoftwareurl: new FormControl(''),
      language: new FormControl(''),
      status :  new FormControl('', Validators.required)
    };

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.listsubscribes = this.pocu.getJSONResult('paramList' , 7).subscribe(sdata => {
      this.accountingsoftwareOptions = sdata.jsn;
    });

    this.pocu.getJSONResult('countryList' , 0).subscribe(data => {
      this.countryOptions = data;
      if(this.countryModel > 0){
        this.cityWait = true;
        this.pocu.getJSONResult('cityList' , this.countryModel ).subscribe(data => {
          this.cityWait = false; this.cityOptions = data;
        });
      }
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

      if(this.formid == 'new'){
        this.pocu.createItem( value ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Firma eklendi' );
            this.router.navigate(['/usersetting/usercompanies']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Firma düzenlendi' );
            this.router.navigate(['/usersetting/usercompanies']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/usersetting/usercompanies']);
  }

}

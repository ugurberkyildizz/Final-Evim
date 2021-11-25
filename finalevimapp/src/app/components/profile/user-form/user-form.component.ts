import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
/* import { AuthService } from '../../services/auth.service'; */
import { PozitifcubeFileService } from '../../../shared/services/pozitifcube-file.service';

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
  userimageurl  = 'assets/images/user/user.png';
  countryOptions:any = [];
  cityOptions:any = [];
  userAccessGroupOptions:any = [];
  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];
  identitycheckOptions:any = [{i:0,n:'Belirsiz'},{i:1,n:'Doğru'},{i:2,n:'Hatalı'}];


  cityWait = false;

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService , private pocuFile:PozitifcubeFileService) {

    this.formid = this.pocu.userInfo.uid;

    this.pocuErrorHandlers = {

      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      birthdate: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      password : new FormControl('', Validators.minLength(6))
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

  }

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  ngOnInit() { 

    this.listsubscribes = this.pocu.getItem( this.formid ).subscribe(data => {

      const values = {};
      for(let k in this.pocuErrorHandlers){
        values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='identitycheck' || k=='status' ? 0:'');
      }
      values['birthdate'] = values['birthdate'].substr(8,2)+values['birthdate'].substr(5,2)+values['birthdate'].substr(0,4);
      if(data['imagedata']) this.userimageurl = data['imagedata'];

      
      this.userForm.setValue(values);
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

      if(this.userimageurl.length > 100) value.imagedata = this.userimageurl;

      value.birthdate = value.birthdate.substr(4,4)+'-'+value.birthdate.substr(2,2)+'-'+value.birthdate.substr(0,2);

      this.pocu.editItem( value , this.formid ).subscribe((response) => {
        if(response['result'] == 'OK'){
          this.toastr.success( 'Kullanıcı düzenlendi' );
          this.router.navigate(['/']);
        }else{
          this.toastr.warning( 'Bir sorun oluştu' );
          console.log(response);
        }
      });

    }
  }

  //Fileupload
  readUrl(event: any) {
    
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) return;
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {

      this.pocuFile.imageFixedSize( reader , 'image/jpeg' , 110 , 110 , 0.4).subscribe(data => {
        if(data !== false){
          this.userimageurl = data;
          /* var info = {'imagedata':data,'call':'changeUserImage','userid':this.authService.userData.uid};
          if(this.authService.userData.photoURL == this.authService.defaultProfilePhoto){
            this.pocu.createItem(info).subscribe((r) => { this.authService.userData.photoURL = data; });
          }else{
            this.pocu.editItem(info,0).subscribe((r) => { this.authService.userData.photoURL = data; });
          } */
        }else{ this.pocu.toastr.error('Görsel tanımlanamadı'); }
      });
      
    }
  }

  cancel() {
    this.router.navigate(['/usersetting/users']);
  }

}

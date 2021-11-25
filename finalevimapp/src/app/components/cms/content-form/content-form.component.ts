import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ContentFormComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  categoryModel = null;
  statusModel = 0;

  categoryOptions:any = [];
  activeLanguages : any[];

  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];
  editorConfig = { editable: true, spellcheck: true, minHeight: '300px', translate: 'no', toolbar: [ ["bold", "italic", "underline", "superscript", "subscript"], ["color" , "justifyLeft", "justifyCenter", "justifyRight", "justifyFull"], ["delete", "removeFormat", "undo"], ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"] , ["code"] ] };

  constructor( public aroute : ActivatedRoute , private fb: FormBuilder, private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.pocuErrorHandlers = { 
      categories : new FormControl('', Validators.required),
      status :  new FormControl('', Validators.required)
    };

    this.activeLanguages = pocu.activeLanguages;

    this.pocu.activeLanguages.forEach(lang => {
      var formGroup:FormGroup = this.fb.group({
        contentname:new FormControl('', Validators.required),
        contentminname:new FormControl(''),
        seourl:new FormControl(''),
        metadesc:new FormControl(''),
        summary:new FormControl(''),
        htmlcontent:new FormControl('')
      });

      this.pocuErrorHandlers[ lang.cd ] = formGroup;
    });

    this.userForm = this.fb.group(this.pocuErrorHandlers);

    this.listsubscribes = this.pocu.getJSONResult('cmsCategoryList' , 0).subscribe( data => {
      this.categoryOptions = data;
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
            values[k] = (data[k] > 0 || data[k]!='' || data[k] instanceof Object) ? data[k] : (k=='parentcategoryid' || k=='status' ? 0:'');
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
            this.router.navigate(['/cms/contents']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        }); 
      }else{
        this.pocu.editItem( value , this.formid ).subscribe((response) => {
          if(response['result'] == 'OK'){
            this.toastr.success( 'Düzenlendi' );
            this.router.navigate(['/cms/contents']);
          }else{
            this.toastr.warning( 'Bir sorun oluştu' );
            console.log(response);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/cms/contents']);
  }

}

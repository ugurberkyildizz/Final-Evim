import { Component, OnInit , ViewEncapsulation , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Image } from '@ks89/angular-modal-gallery';

import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ProductPreviewComponent implements OnInit , OnDestroy {

  public userForm: FormGroup;
  public sidebaron: any;
  public errorMessage: any;
  public pocuErrorHandlers : {};
  public listsubscribes :any;

  formid : any;
  product : any[] = null;
  activeLanguages : any[];
  colorsOptions:any = [];

  imageBaseUrl:any = this.pocu.base_path;
  imageList:any = [];
  mainImageUrl:any = '';
  imagesRect: Image[] = [];

  statusOptions:any = [{i:0,n:'Yeni'},{i:1,n:'Aktif'},{i:2,n:'Pasif'}];

  constructor( public aroute : ActivatedRoute , private router: Router, private toastr:ToastrService , private pocu:PozitifcubeHttpService) {

    this.activeLanguages = pocu.activeLanguages;

  }


  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  ngOnInit() { 

    this.aroute.paramMap.subscribe(params => { 
      this.formid = params.get('id');
      if(this.formid !== 'new'){
        this.listsubscribes = this.pocu.getItem(this.formid).subscribe(data => {

          this.imagesRect.push( new Image(0, { img: this.imageBaseUrl+data['mainimage'].replace('thumbs/','') }, { img: this.imageBaseUrl+data['mainimage'] }) );
          data['images'].forEach(img => {
            if(data['mainimage'] !== img) this.imagesRect.push( new Image(0, { img: this.imageBaseUrl+img.replace('thumbs/','') }, { img: this.imageBaseUrl+img }) );
          });

          delete data['mainimage'];
          delete data['images'];

          this.product = data;

        });
      }
    }); 
    
  }

}

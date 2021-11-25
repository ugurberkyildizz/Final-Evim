import { Component , ViewChild , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit , OnDestroy{

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('actionButtons', { static: true }) actionButtons : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;
 
  public tabledata : any[];
  public temp = [];
  public loading = null;
  public columns = [];
  public listsubscribes :any;
  
  scrollBarHorizontal = false;

  constructor( public router : Router , private pocu:PozitifcubeHttpService ) {

    this.scrollBarHorizontal = pocu.scrollBarHorizontal;

    this.loading = true;
    this.listsubscribes = this.pocu.getViewList({}).subscribe(data => {
      this.tabledata = data;
      this.temp = data;
      this.loading = false;
    });
  }

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  approveAgent(value){
    alert('Onaylamak için forma giriş yapınız');
  }

  editAgent(value){
    this.router.navigate(['/siteuser/userform/'+value]);
  }

  addUserLink(){

    this.router.navigate(['/siteuser/userform/new']);

  }

  ngOnInit() {

    this.columns = [
      { prop: 'cm' , name: 'Firma', sortable: true,  headerTemplate: this.hdrTpl },
      { prop: 'nm' , name: 'İsim', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'sm' , name: 'Soyisim', sortable: true,  headerTemplate: this.hdrTpl },
      { prop: 'em' , name: 'E-posta', sortable: true , headerTemplate: this.hdrTpl},
      { prop: 'st' , name: 'Durum', sortable: true  , headerTemplate: this.hdrTpl},
      { prop: 'id' , name: '', headerClass: 'toolbox' , sortable: true ,canAutoResize : false, width:90 , cellTemplate: this.actionButtons}
    ];
  }

  updateFilter(event) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nm.toLowerCase().indexOf(val) !== -1 || d.sm.toLowerCase().indexOf(val) !== -1 || d.em.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tabledata = temp;

  }

  updateColFilter(event, prop) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function(d) {
      var thisval=d[prop]+''; return thisval.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tabledata = temp;
  }

}

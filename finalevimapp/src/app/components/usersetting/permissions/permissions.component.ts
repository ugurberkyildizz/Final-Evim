import { Component , ViewChild , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit,OnDestroy {

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('actionButtons', { static: true }) actionButtons : TemplateRef<any>;
  @ViewChild('status', { static: true }) status : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;

  public tabledata : any[];
  public temp = [];
  public loading = null;
  public columns = [];
  public listsubscribes :any;
  
  constructor( public router : Router , private pocu:PozitifcubeHttpService ) {

    this.loading = true;
    this.listsubscribes = this.pocu.getViewList({}).subscribe(data => {
      this.tabledata = data;
      this.loading = false;
    });
  }

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  updateFilter(event) {

    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.nm.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.tabledata = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;

  }

  approveAgent(value){
    alert('ok: '+value);
  }

  editPermission(value){
    this.router.navigate(['/usersetting/permissionform/'+value]);
  }

  addPermissionLink(){

    this.router.navigate(['/usersetting/permissionform/new']);

  }

  ngOnInit() {

    this.columns = [
      { prop: 'nm' , name: 'Yetki Grubu Adı', sortable: true ,canAutoResize : false, width:160, headerTemplate: this.hdrTpl},
      { prop: 'dh' , name: 'Anasayfa', sortable: true , headerTemplate: this.hdrTpl ,canAutoResize : false, width:160},
      { prop: 'pt' , name: 'Sayfalar', sortable: true , headerTemplate: this.hdrTpl},
      { prop: 'st' , name: 'Durum', sortable: true  , cellTemplate: this.status ,canAutoResize : false, width:100, headerTemplate: this.hdrTpl},
      { prop: 'id' , name: '', headerClass: 'toolbox' , sortable: true ,canAutoResize : false, width:90 , cellTemplate: this.actionButtons}
    ];
  }

}

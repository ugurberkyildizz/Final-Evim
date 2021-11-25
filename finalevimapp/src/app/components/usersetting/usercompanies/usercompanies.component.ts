import { Component , ViewChild , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";


@Component({
  selector: 'app-usercompanies',
  templateUrl: './usercompanies.component.html',
  styleUrls: ['./usercompanies.component.scss']
})

export class UsercompaniesComponent implements OnInit , OnDestroy{

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
      return d.nm.toLowerCase().indexOf(val) !== -1 || d.co.toLowerCase().indexOf(val) !== -1 || d.ct.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.tabledata = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;

  }

  editLink(value){
    this.router.navigate(['/usersetting/usercompanyform/'+value]);
  }

  addLink(){

    this.router.navigate(['/usersetting/usercompanyform/new']);

  }

  ngOnInit() {

    this.columns = [
      { prop: 'nm' , name: 'Şube Adı', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'co' , name: 'Ülke', sortable: true, flexGrow: 1, headerTemplate: this.hdrTpl },
      { prop: 'ct' , name: 'Şehir', sortable: true, flexGrow: 1, headerTemplate: this.hdrTpl },
      { prop: 'tx' , name: 'Vergi No', sortable: true, flexGrow: 1, headerTemplate: this.hdrTpl },
      { prop: 'dv' , name: 'Yazılım', sortable: true, headerTemplate: this.hdrTpl },
      { prop: 'st' , name: 'Durum', sortable: true  , cellTemplate: this.status, headerTemplate: this.hdrTpl},
      { prop: 'id' , name: '', headerClass: 'toolbox' , sortable: true ,canAutoResize : false, width:90 , cellTemplate: this.actionButtons}
    ];
  }

}

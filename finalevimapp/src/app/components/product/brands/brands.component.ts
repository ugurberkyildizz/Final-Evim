import { Component , ViewChild , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})

export class BrandsComponent implements OnInit , OnDestroy{

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
      this.temp = data;
      this.loading = false;
    });
  }

  ngOnDestroy(){
    this.listsubscribes.unsubscribe();
  }

  editLink(value){
    this.router.navigate(['/product/brandform/'+value]);
  }

  addLink(){

    this.router.navigate(['/product/brandform/new']);

  }

  ngOnInit() {

    this.columns = [
      { prop: 'nm' , name: 'Marka Adı', sortable: true, headerTemplate: this.hdrTpl},
      // { prop: 'co' , name: 'Firma', sortable: true, flexGrow: 1, headerTemplate: this.hdrTpl },
      { prop: 'st' , name: 'Durum', sortable: true  , cellTemplate: this.status, headerTemplate: this.hdrTpl},
      { prop: 'id' , name: '', headerClass: 'toolbox' , sortable: true ,canAutoResize : false, width:90 , cellTemplate: this.actionButtons}
    ];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function (d) {
      return (d.nm+'').toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tabledata = temp;
  }

  updateColFilter(event, prop) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function(d) {
      return (d[prop]+'').toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tabledata = temp;
  }

}

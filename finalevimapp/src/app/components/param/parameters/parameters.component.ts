import { Component , ViewChild , TemplateRef , OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

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

  ngOnInit() {

    this.columns = [
      { prop: 'nm' , name: 'Parametre Adı', sortable: true , headerTemplate: this.hdrTpl},
      { prop: 'ct' , name: 'Grup Adı', sortable: true , headerTemplate: this.hdrTpl},
      { prop: 'st' , name: 'Durum', sortable: true  , cellTemplate: this.status, headerTemplate: this.hdrTpl},
      { prop: 'id' , name: '', headerClass: 'toolbox' , sortable: true ,canAutoResize : false, width:70 , cellTemplate: this.actionButtons}
    ];

  }

  editLink(value){
    this.router.navigate(['/param/parameterform/'+value]);
  }

  addParameterLink(){

    this.router.navigate(['/param/parameterform/new']);

  }
  //(d['Müşteri Adı']+'').toLowerCase().indexOf(val) !== -1 ||
  updateFilter(event) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function (d) {
      return (d['Parametre Adı']+'').toLowerCase().indexOf(val) !== -1 || (d['Grup Adı']+'').toLowerCase().indexOf(val) !== -1 || !val;
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

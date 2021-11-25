import { Component , ViewChild , TemplateRef , OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit , OnDestroy {

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
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
      { prop: 'nm' , name: 'Ülke Adı', sortable: true, headerTemplate: this.hdrTpl },
      { prop: 'i2' , name: 'ISO2', sortable: true , cellClass: 'uppercase', headerTemplate: this.hdrTpl},
      { prop: 'i3' , name: 'ISO3', sortable: true , cellClass: 'uppercase', headerTemplate: this.hdrTpl},
      { prop: 'st' , name: 'Durum', sortable: true  , canAutoResize : false, width:80, cellTemplate: this.status , frozenRight : true, headerTemplate: this.hdrTpl}
    ];

  }

  changeStatus( row ){
    const ind = this.tabledata.indexOf( row );
    const ind2 = this.temp.indexOf( row );
    if(ind > -1 && ind2 > -1){
      const thisrow = row;
      thisrow.rqif = 'status';
      thisrow.st=row.st==0?1:0;
      const contentid = this.tabledata[ ind ].id;
      this.pocu.editItem( thisrow , contentid ).subscribe((response) => {
        if(response['result'] == 'OK'){
          this.tabledata[ind].st=thisrow.st;
          this.temp[ind2].st=thisrow.st;
          this.pocu.toastr.success( 'Durum düzenlendi' );
        }else{
          this.pocu.toastr.warning( 'Bir sorun oluştu' );
        }
      }); 
    }
  }

  updateFilter(event) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nm.toLowerCase().indexOf(val) !== -1 || d.i2.toLowerCase().indexOf(val) !== -1 || d.i3.toLowerCase().indexOf(val) !== -1 || !val;
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

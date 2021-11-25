import { Component , ViewChild , TemplateRef , OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit , OnDestroy {

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('status', { static: true }) status : TemplateRef<any>;
  @ViewChild('sitecurrency', { static: true }) sitecurrency : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;
  
  public tabledata : any[];
  public temp : any[];
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
      { prop: 'nm' , name: 'Adı', sortable: true , headerTemplate: this.hdrTpl},
      { prop: 'cc' , name: 'Kodu', sortable: true , headerTemplate: this.hdrTpl},
      { prop: 'sc' , name: 'Erişim', sortable: true  , canAutoResize : false, width:85 , cellTemplate: this.sitecurrency, headerTemplate: this.hdrTpl},
      { prop: 'st' , name: 'Durum', sortable: true  , canAutoResize : false, width:80  , cellTemplate: this.status, headerTemplate: this.hdrTpl}
    ];

  }

  changeAccess( row ){
    const ind = this.tabledata.indexOf( row );
    if(ind > -1){
      const thisrow = row;
      thisrow.rqif = 'access';
      thisrow.sc=row.sc==0?1:0;
      const contentid = this.tabledata[ ind ].id;
      this.pocu.editItem( thisrow , contentid ).subscribe((response) => {
        if(response['result'] == 'OK'){
          this.tabledata[ind].sc=thisrow.sc;
          this.pocu.toastr.success( 'Erişim düzenlendi' );
        }else{
          this.pocu.toastr.warning( 'Bir sorun oluştu' );
        }
      }); 
    }
  }

  changeStatus( row ){
    const ind = this.tabledata.indexOf( row );
    if(ind > -1){
      const thisrow = row;
      thisrow.rqif = 'status';
      thisrow.st=row.st==0?1:0;
      const contentid = this.tabledata[ ind ].id;
      this.pocu.editItem( thisrow , contentid ).subscribe((response) => {
        if(response['result'] == 'OK'){
          this.tabledata[ind].st=thisrow.st;
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
      return d.nm.toLowerCase().indexOf(val) !== -1 || d.cc.toLowerCase().indexOf(val) !== -1 || !val;
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

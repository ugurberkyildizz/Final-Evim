import { Component , ViewChild , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})

export class SalesComponent implements OnInit , OnDestroy{

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('actionButtons', { static: true }) actionButtons : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild("historyMoneyCell", { static: true }) historyMoneyCell: TemplateRef<any>;

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

  editLink(value){

    this.router.navigate(['/orders/saleform/'+value]);
    
  }

  addLink(){

    this.router.navigate(['/orders/saleform/new']);

  }

  ngOnInit() {

    this.columns = [
      { prop: 'cnm' , name: 'Müşteri', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'unm' , name: 'Kullanıcı', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'od' , name: 'Sipariş Tarihi', sortable: true,canAutoResize : false, width:155, headerTemplate: this.hdrTpl},
      { prop: 'ttc' , name: 'Toplam Tutar', sortable: true, canAutoResize : false, width:120 , headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell},
      { prop: 'tts' , name: 'Ara Toplam', sortable: true, canAutoResize : false, width:120 , headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell },
      { prop: 'ttt' , name: 'Vergi', sortable: true, canAutoResize : false, width:115 , headerTemplate: this.hdrTpl, cellTemplate: this.historyMoneyCell },
      { prop: 'ttd' , name: 'İndirim', sortable: true,canAutoResize : false, width:105 , headerTemplate: this.hdrTpl , cellTemplate: this.historyMoneyCell},
      { prop: 'st' , name: 'Durum', sortable: true,canAutoResize : false, width:90  , headerTemplate: this.hdrTpl},
      { prop: 'id' , name: '', headerClass: 'toolbox' , sortable: true , canAutoResize : false, width:60 , cellTemplate: this.actionButtons}
    ];
    
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function (d) {
      return (d.cnm+'').toLowerCase().indexOf(val) !== -1 || (d.unm+'').toLowerCase().indexOf(val) !== -1 || (d.od+'').toLowerCase().indexOf(val) !== -1 || !val;
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

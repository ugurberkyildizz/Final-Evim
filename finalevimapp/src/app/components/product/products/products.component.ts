import { Component , ViewChild , TemplateRef , OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit , OnDestroy{

  @ViewChild('DatatableComponent',{static: true}) table: DatatableComponent;
  @ViewChild('actionButtons', { static: true }) actionButtons : TemplateRef<any>;
  @ViewChild('productImage', { static: true }) productImage : TemplateRef<any>;
  @ViewChild("hdrTpl", { static: true }) hdrTpl: TemplateRef<any>;
 
  public tabledata : any[];
  public temp = [];
  public loading = null;
  public columns = [];
  public listsubscribes :any;

  public companyOptions:any = [];
  public companyModel = null;

  public userdata:any = [];

  imageBaseUrl:any = this.pocu.base_path;

  scrollBarHorizontal = false;
  
  constructor( public router : Router , private pocu:PozitifcubeHttpService , public authService: AuthService) {

    this.scrollBarHorizontal = pocu.scrollBarHorizontal;

    this.userdata = this.authService.userData;
    this.listsubscribes = this.pocu.getJSONResult('adminCompanyList',0).subscribe( data => {

      if(this.userdata.uComs.length>0){
        var companyList:any=[];
        data.forEach(row => { if(this.userdata.uComs.includes(row.i)){ companyList.push( row ); } });
        this.companyOptions = companyList;
        // buraya son açtığı firmayı storage yapan birşey ekleyebiliriz ?
        if(this.userdata.uComs.length == 1){
          this.companyModel = this.userdata.uComs[0];
          if(this.companyModel > 0){ this.getProducts(); }
        }
      }else if(this.userdata.acg == 1){ this.companyOptions = data; } // yönetici admin ise
    });
  }

  ngOnDestroy(){
    // this.listsubscribes.unsubscribe();
  }

  editLink(value){
    if(this.companyModel > 0){
      
      // this.router.navigate(['/product/productform/'+value+'/'+this.companyModel ]);
      // const url = this.router.serializeUrl(this.router.createUrlTree(['/my/url/route'], { queryParams: { ...anyQueryParamsYouWantOrOmitThis } }));
      
      // const url = this.router.serializeUrl(this.router.createUrlTree([this.pocu.panel_path +'product/productform/'+value+'/'+this.companyModel] ));

      const url = this.router.serializeUrl(this.router.createUrlTree(['product/productform/'+value+'/'+this.companyModel] ));
      
      window.open(url, '_blank');
      
    }else{ this.pocu.toastr.warning( 'Firma seçimi yapınız.' ); }
  }

  getProducts(){

    this.loading = true;
    this.listsubscribes = this.pocu.getViewList({'companyid':this.companyModel,'productlist':true}).subscribe((response) => {
      
      if(response['result'] == 'OK'){
        this.tabledata = response['list'];
        this.temp = response['list'];
      }else if(response['result'] == 'ERROR'){
        this.pocu.toastr.warning( response['message'] );
        console.log( response );
      }else{
        this.pocu.toastr.warning( 'Liste getirilirken hata oluştu.' );
        console.log( response );
      }
      this.loading = false;

    });

  }

  startSync(){
    this.loading = true;
    this.listsubscribes = this.pocu.getViewList({'companyid':this.companyModel,'productsync':true}).subscribe((response) => {
      if(response['result'] == 'OK'){
        this.pocu.toastr.success( 'Senkronizasyon tamamlandı.' );
      }else if(response['result'] == 'ERROR'){
        this.pocu.toastr.warning( response['message'] );
        console.log( response );
      }else{
        this.pocu.toastr.warning( 'Senkronizasyonda hata oluştu.' );
        console.log( response );
      }
      this.loading = false;
    });
  }

  ngOnInit() {

    this.columns = [
      { prop: 'im' , name: 'Img', sortable: true, headerTemplate: this.hdrTpl ,canAutoResize : false, width:70 , cellTemplate: this.productImage},
      { prop: 'nm' , name: 'İçerik Başlığı', sortable: true, headerTemplate: this.hdrTpl},
      { prop: 'pc' , name: 'Ürün Kodu', sortable: true,  headerTemplate: this.hdrTpl },
      { prop: 'pp' , name: 'Fiyat', sortable: true,  headerTemplate: this.hdrTpl },
      { prop: 'ps' , name: 'Stok', sortable: true,  headerTemplate: this.hdrTpl },
      { prop: 'si' , name: 'Son İşlem', sortable: true , headerTemplate: this.hdrTpl},
      { prop: 'std' , name: 'StDş', sortable: true , headerTemplate: this.hdrTpl ,canAutoResize : false, width:70},
      { prop: 'trm' , name: 'Term', sortable: true , headerTemplate: this.hdrTpl ,canAutoResize : false, width:70},
      { prop: 'ind' , name: 'İnd.', sortable: true , headerTemplate: this.hdrTpl ,canAutoResize : false, width:65},
      { prop: 'sec' , name: 'Seç.', sortable: true , headerTemplate: this.hdrTpl ,canAutoResize : false, width:65},
      { prop: 'onr' , name: 'Önr.', sortable: true , headerTemplate: this.hdrTpl ,canAutoResize : false, width:65},
      
      { prop: 'st' , name: 'Durum', sortable: true , headerTemplate: this.hdrTpl ,canAutoResize : false, width:90},
      { prop: 'id' , name: '', headerClass: 'toolbox' , sortable: true ,canAutoResize : false, width:60 , cellTemplate: this.actionButtons}
    ];
  }

  addLink(){
    if(this.companyModel > 0){
      this.router.navigate(['/product/productform/new/'+this.companyModel ]);
    }else{ this.pocu.toastr.warning( 'Firma seçimi yapınız.' ); }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase()+'';
    const temp = this.temp.filter(function (d) {
      // return (d.nm+'').toLowerCase().indexOf(val) !== -1 || d.pc == val || !val;
      return (d.nm+'').toLowerCase().indexOf(val) !== -1 || (d.pc+'').toLowerCase().indexOf(val) !== -1 || !val;
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

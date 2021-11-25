import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pozitifcube';

  constructor( public translate: TranslateService ) {

    translate.addLangs(['en', 'tr']);

    var savedlang = localStorage.getItem('userlang');
    
    if(savedlang == 'tr' || savedlang == 'en'){
      translate.setDefaultLang(savedlang);
      translate.use(savedlang);
    }else{
      translate.setDefaultLang('tr');
      translate.use('tr');
      localStorage.setItem("userlang",'tr');
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PozitifcubeHttpService , defaulthomeurl} from '../services/pozitifcube-http.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router , public pocu: PozitifcubeHttpService) {}

  
  controlAndGoTo( url:string ){
    var ctrl = true;
    if(url == "/"){ if(!this.pocu.canActiveRoutes.includes( url )) ctrl = false; }
    else if( !this.pocu.canActiveRoutes.find( apath => apath === url || url.indexOf(apath) > -1 ) ){ ctrl = false;  } 
    if(ctrl == false){ this.router.navigate([ defaulthomeurl ]); return false; }else return true;
  }

  controlGetNavUrls( url ){
    if(this.pocu.ismenuget == 2){  // menü cevabı dönmüş
      return this.controlAndGoTo( url );
    }else if(this.pocu.ismenuget == 3){ // login değil ya da token uyuşmuyor
      if(url=='/auth/login'){ return true; }
      else{ this.authService.SignOut(false); return false; } // bu fonksiyonda aynı zamanda auth/login route yapılıyor
    }else if(this.pocu.ismenuget == 5){
      this.pocu.toastr.warning('Bir sorun oluştu. Devam ederse sayfayı yenileyip tekrar deneyiniz.');
      return false;
    }else return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(localStorage.getItem('usertokenx') && localStorage.getItem('usertokeny')){
      if( this.pocu.ismenuget == 0){ // ilk giriş ya da refresh sırasında sorar
        return new Promise((resolve, reject) => {
          this.pocu.createMenu().subscribe((response) => {
            if(response == 2) this.authService.writeUserInfo();
            resolve( this.controlGetNavUrls(state.url) );
          });
        });
      }else{
        this.authService.writeUserInfo();
        return this.controlAndGoTo( state.url );
      }
    }else{
      if(state.url !== '/auth/login'){ this.pocu.ismenuget = 0; this.router.navigate(['/auth/login']); }
      return true;
    }
  }
}

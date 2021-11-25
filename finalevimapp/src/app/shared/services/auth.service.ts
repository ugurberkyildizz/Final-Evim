import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { PozitifcubeHttpService } from './pozitifcube-http.service';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  public userData: any;
  // public user: firebase.User;
  private _sessionId: string;
  public showLoader: boolean = false;
  public defaultProfilePhoto = 'assets/images/user/user.png';

  constructor( public pocu: PozitifcubeHttpService , public router: Router, public ngZone: NgZone, public toastr: ToastrService, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  writeUserInfo(){

      this.userData = this.pocu.userInfo;
      this.userData.photoURL = this.userData.photoURL || this.defaultProfilePhoto;
      // this._sessionId = this.userData;
      // this.SetUserData(this.pocu.userInfo);
  }

  LoginProcess(userinfo , errtext){
    this.pocu.loginPost(userinfo).subscribe((response) => {
      if(response['result'] == 'login'){
        this.pocu.ismenuget = 0;
        localStorage.setItem("usertokenx",response['tokenx']);
        localStorage.setItem("usertokeny",response['tokeny']);
        this.router.navigate([ '/fakepath' ]);
        this.toastr.success( 'Giriş Yapıldı' );
      }else{
        this.toastr.error( errtext );
      }
    });
  }

  //sign in qr function
  LoginwithQr(qrcode){
    
    var userinfo = {'loginqrtoken':qrcode,'loginwxtoken':'GJ95KLIT50ZAP392ONUR088','call':'loginqr'};
    this.LoginProcess(userinfo , 'QR kodunuzu kontrol ediniz' );

  }

  //sign in function
  SignIn(email, password ) {

    var userinfo = {'email':email,'password':password,'call':'login'};
    this.LoginProcess(userinfo , 'Bilgilerinizi kontrol ediniz');

  }
  //main verification function
  SendVerificationMail() {
    /*return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigateByUrl('/dashboard/default');
      })*/
  }

  ForgotPassword(passwordResetEmail) {
    /*return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });*/
  }

  //Authentication for Login
  AuthLogin(provider) {
    /*eturn this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard/default']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });*/
  }

  //Set user
  SetUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    
    /*const userData: User = {
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL || this.defaultProfilePhoto,
      emailVerified: user.emailVerified
    };*/

    /*
    userRef.delete().then(function () {
    }).catch(function (error) {
    });
    return userRef.set(userData, {
      merge: true
    });*/
  }

  // Sign out
  SignOut( type = true ) {
    if(type == false){
      localStorage.removeItem('usertokeny'); localStorage.removeItem('usertokenx');
      this.toastr.warning('Oturumunuz sonlandı');
      this.router.navigate(['/auth/login']);
      location.reload();
    }
    else{
      var x=localStorage.getItem('usertokenx'),y=localStorage.getItem('usertokeny');
      this.pocu.logoutPost({'logoutx':x,'logouty':y,'call':'logout'}).subscribe((response) => {
        if(response['result'] == 'logout'){ }else{  }
        location.reload();
      });
      localStorage.removeItem('usertokeny'); localStorage.removeItem('usertokenx');
      this.toastr.success('Oturumunuz kapatıldı');
      this.router.navigate(['/auth/login']);
    }
    /* localStorage.removeItem('usertokenx');
    localStorage.removeItem('usertokeny');
    if(type == false) this.toastr.warning('Oturumunuz sonlandı');
    else  this.toastr.success('Oturumunuz kapatıldı');
    this.router.navigate(['/auth/login']); */
    /*this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };*/
    /*return this.afAuth.auth.signOut().then(() => {
      this.showLoader = false;
      localStorage.clear();
      this.cookieService.deleteAll('user', '/auth/login');
      this.router.navigate(['/auth/login']);
    });*/
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null && user.emailVerified != false) ? true : false;
  }

}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let user = JSON.parse(localStorage.getItem('user'));

        // şuanda, mevcut bir kullanıcı, login olmuş fakat login sayfasına giriş yapmışsa, dashboard'a atmak için kullanılıyor

        if (this.authService.isLoggedIn) {
            window.alert("You are not allowed to access this URL!");
            this.router.navigate(['/'])
        }

        return true;
    }
}
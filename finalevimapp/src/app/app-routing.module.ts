import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './shared/components/layout/full-layout/full-layout.component';
import { content } from "./shared/routes/content-routes";
import { full } from './shared/routes/full.routes';
import { AdminGuard } from './shared/guard/admin.guard';

import { defaulthomeurl } from './shared/services/pozitifcube-http.service';

// Login, şifremi unuttum gibi durumlar için bir guard, kalan herşey için başka guard kullanacağız

const routes: Routes = [ 
  {
    path: 'auth/login',
    canActivate: [AdminGuard],
    component: LoginComponent
  },
  {
    path: '',
    component: ContentLayoutComponent, // her birinin canActive:[AdminGuard] koruması kendi alt routelarında
    children: content
  },
  {
    path: '',
    component: FullLayoutComponent, 
    children: full
  },
  {
    path: '**',
    redirectTo: defaulthomeurl
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
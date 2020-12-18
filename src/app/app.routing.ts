import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').
        then(m => m.AdminLayoutModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent}
  /*{
   path: 'login',
    component: LoginLayoutComponent,
    children: [
      { 
        path: 'login',
        loadChildren: './layouts/login-layout.module#LoginLayoutModule'
      }
    ]
  }*/
];

/*const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').
        then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      { 
        path: 'login',
        loadChildren: './layouts/login-layout.module#LoginLayoutModule'
      }
    ]
  }
];*/

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule
    ],
})
export class AppRoutingModule {  }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgxImageCompressService} from 'ngx-image-compress';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }

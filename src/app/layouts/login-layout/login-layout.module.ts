import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { LoginLayoutRoutes } from '../login-layout/login-layout.routing';




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(LoginLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule
    ],
    declarations: [
    ],
    exports: [FormsModule, HttpClientModule,RouterModule
    ],
})
export class LoginLayoutModule {}
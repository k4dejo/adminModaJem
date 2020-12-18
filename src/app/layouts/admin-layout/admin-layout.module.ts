import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AdminLayoutRoutes } from '../admin-layout/admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { BillingComponent } from '../../billing/billing.component';
import { OrdersComponent } from '../../orders/orders.component';
import { ProductsComponent } from '../../products/products.component';
import { OutfitsComponent } from '../../outfits/outfits.component';
import { BrandsComponent } from '../../brands/brands.component';
import { CouponsComponent } from '../../coupons/coupons.component';
import { PromoComponent } from '../../promo/promo.component';
import { EditproductComponent } from '../../editproduct/editproduct.component';
import { ApartComponent } from '../../apart/apart.component';
import { NgbdModalContent } from '../../apart/modalClient.component'

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      RouterModule.forChild(AdminLayoutRoutes),
      FormsModule,
      ChartsModule,
      NgbModule,
      HttpClientModule,
      NgxDropzoneModule,
      NgxPaginationModule,
      Ng2SearchPipeModule,
      ToastrModule.forRoot()
    ],
    declarations: [
      DashboardComponent,
      BillingComponent,
      OrdersComponent,
      ProductsComponent,
      OutfitsComponent,
      BrandsComponent,
      CouponsComponent,
      EditproductComponent,
      PromoComponent,
      NgbdModalContent,
      ApartComponent
    ],
    exports: [ToastrModule, HttpClientModule,RouterModule
    ],
  })
  
  export class AdminLayoutModule {}
  
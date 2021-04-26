import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProductsComponent } from '../../products/products.component';
import { BillingComponent } from '../../billing/billing.component';
import { OrdersComponent } from '../../orders/orders.component';
import { OutfitsComponent } from '../../outfits/outfits.component';
import { BrandsComponent } from '../../brands/brands.component';
import { CouponsComponent } from '../../coupons/coupons.component';
import { PromoComponent } from '../../promo/promo.component';
import { EditproductComponent } from '../../editproduct/editproduct.component';
import { ApartComponent } from 'src/app/apart/apart.component';
import { SendbillingComponent } from '../../sendbilling/sendbilling.component';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',          component: DashboardComponent },
    { path: 'productos',          component: ProductsComponent },
    { path: 'Facturacion',        component: BillingComponent },
    { path: 'Apartados',          component: ApartComponent },
    { path: 'Pedidos',            component: OrdersComponent },
    { path: 'Outfits',            component: OutfitsComponent },
    { path: 'Marcas',             component: BrandsComponent },
    { path: 'Promociones',        component: PromoComponent },
    { path: 'Cupones',            component: CouponsComponent },
    { path: 'editarProducto/:id', component: EditproductComponent },
    { path: 'facturar/:id/:shipping',       component: SendbillingComponent },
];
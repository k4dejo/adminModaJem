import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/productos', title: 'Productos',  icon:'shopping_bag-16', class: '' },
  { path: '/Apartados', title: 'Facturación',  icon:'shopping_shop', class: '' },
  { path: '/Pedidos', title: 'Pedidos',  icon:'shopping_delivery-fast', class: '' },

  { path: '/Outfits', title: 'Outfits',  icon:'education_glasses', class: '' },
  { path: '/Marcas', title: 'Marcas',  icon:'shopping_tag-content', class: '' },
  { path: '/Promociones', title: 'Promociones',  icon:'business_money-coins', class: '' },
  { path: '/Cupones', title: 'Cupones',  icon:'business_badge', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };

}

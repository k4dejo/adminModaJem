import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ApartService } from '../services/apart.service';
import { BillingService } from '../services/billing.service';
import { InvoiceService } from '../services/invoice.service';

import { Apart } from '../models/apart';
import { Billing } from '../models/billing';

@Component({
  selector: 'app-sendbilling',
  providers: [AdminService, ApartService, BillingService, InvoiceService],
  templateUrl: './sendbilling.component.html',
  styleUrls: ['./sendbilling.component.scss']
})
export class SendbillingComponent implements OnInit {
  public token;
  public apartM: Apart;
  public billing: Billing;
  public arrayBilling;
  public identity;
  public arrayApart;
  public pPublic = true;
  public loading =  false;
  public pMajor = false;
  public pBoutique = false;
  public shipping = 0;
  public date: string;
  public currentDate = new Date();
  public day;
  public month;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private billingService: BillingService,
    private invoiceService: InvoiceService,
    private apartService: ApartService
  ) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
    this.billing = new Billing('', 0, '', '', '', '', '', '');
    this.apartM = new Apart('', 0, 0, '', '', '');
  }

  getApart() {
    this.apartService.getOnlyApart(this.apartM.id).subscribe(
      response => {
        this.billing.client = response.client.name;
        this.billing.email = response.client.email;
        this.billing.address = response.client.address;
        this.billing.addressDetail = response.client.addressDetail;
        this.billing.phone = response.client.phone;
        this.apartM.clients_id = response.client.id;
        this.apartM.typeSell = response.apart.typeSell;
        this.apartM.admin_id = response.apart.admin_id;
        this.billing.price = response.apart.price;
        this.arrayApart = response.products;
      }, error => {
        console.log(<any> error);
      }
    );
  }

    // =============================Facturacion===============================
    addNewFact() {
      this.loading = true;
      this.apartM.price += this.shipping;
      this.apartM.status = "completo";
      
      console.log(this.apartM);
      this.apartService.editApart(this.token, this.apartM).subscribe(
        response => {
          if (response.status === 'success') {
            this.createInvoicePDF();
            this.shipping = 0;
            this.loading = false;
            this.apartM = new Apart('', 0, 0, '', '', '');
          }
        }, error => {
          console.log(<any> error);
        }
      );
    }
  
    createInvoicePDF() {
      this.invoiceService.getInvoice(this.shipping, this.apartM.id).subscribe(
        response => {
        }, error => {
          console.log(<any>error);
        }
      );
    }
  
    editShipping(e: any) {
      this.shipping = e.target.value;
    }

  getDate() {
    this.day = this.currentDate.getDate();
    if (this.currentDate.getDate() < 10) {
      this.day = '0' + this.currentDate.getDate().toString();
    }
    if (this.currentDate.getMonth() === 0) {
      this.month = this.currentDate.getMonth().toString() + '1';
    } else {
      this.month = this.currentDate.getMonth() + 1;
    }
    this.date = this.currentDate.getFullYear() + '-' + this.month + '-' + this.day;
  }

  whichPrice(typeSell) {
    switch (typeSell) {
      case 'public':
        this.pPublic = true;
        this.pMajor = false;
        this.pBoutique = false;
      break;
      case 'major':
        this.pPublic = false;
        this.pMajor = true;
        this.pBoutique = false;
      break;
      case 'boutique':
        this.pPublic = false;
        this.pMajor = false;
        this.pBoutique = true;
      break;
    
      default:
        console.log('Fuera de rango');
      break;
    }
  } 

  ngOnInit(): void {
    this.apartM.id = this.route.snapshot.params['id'];
    this.shipping = this.route.snapshot.params['shipping'];
    this.getApart();
    this.getDate();
  }

}

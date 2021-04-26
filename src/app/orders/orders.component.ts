import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { PurchaseService } from '../services/purchase.service';
import { Purchase } from '../models/purchase';
import { PurchaseInfo } from '../models/purchaseInfo';
import { Ticket } from '../models/ticketPurchase';
import { ImgUrl } from '../models/imgUrl';
import { AddresPurchases } from '../models/addressPurchase';
import { AddresServices } from '../services/addres.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  providers: [AdminService, PurchaseService, AddresServices],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  public token;
  public identity;
  public purchaselist;
  public ticketPurchase: Ticket;
  public purchaseinfo: PurchaseInfo;
  public addressPurchase: AddresPurchases;
  public imgUrl = ImgUrl;
  public productList;
  public randomChar: string;
  public fileUrl;
  public p = 1;
  public pModalClient = 1;
  public sendBtnBool = false;
  public PricePurchase = 0;
  public lenghtOrders;
  public urlPaginate: any;
  public pageChange;
  public btnNextDisabled =  true;
  public loading = false;
  public searchProduct;
  public totalAmount: any;
  public productCount;
  public viewOrdersListBool = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService,
    private addressService: AddresServices,
    private purchaseService: PurchaseService
  ) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
    this.purchaseinfo = new PurchaseInfo('', '', '', '', '', 0, 0);
    this.addressPurchase = new AddresPurchases('', '', '');
    this.ticketPurchase = new Ticket(null, '');
  }

  searchPurchase(value) {
    this.getPurchaseStatus(value);
  }

  closeviewOrder() {
    this.viewOrdersListBool = false;
  }

  nextPaginate(event: any) {
    this.loading = true;
    const urlSplit = this.urlPaginate.split('=');
    this.pageChange = urlSplit[0] + '=' + event;
    this.p = event;
    this.purchaseService.getPaginateOrder(this.pageChange).subscribe(
      response => {
        this.purchaselist = response.purchases.data;
        this.calculatePrice(this.purchaselist);
        if (response.NextPaginate == null) {
          this.btnNextDisabled = false;
        } else {
          this.btnNextDisabled = true;
          this.urlPaginate = response.NextPaginate;
        }
        this.loading = false;
      }
    );
  }

  getPurchaseStatus(value) {
    this.loading = true;
    this.purchaseService.getStatusPurchase(value).subscribe(
      response => {
        this.purchaselist = response.purchases.data;
        this.lenghtOrders = response.purchases.total;
        this.calculatePrice(this.purchaselist);
        if (response.NextPaginate == null) {
          // this.btnNextDisabled = false;
          this.urlPaginate = response.purchases.last_page_url;
        } else {}
        this.getClientPurchase(this.purchaselist);
        this.loading = false;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  getClientPurchase(dataPurchase: any) {
    for (let index = 0; index < dataPurchase.length; index++) {
      this.adminService.getClientPurchase(dataPurchase[index].clients_id).subscribe(
        response => {
        }, error => {
          console.log(<any>error);
        }
      );
    }
  }

  processArrayPurchase() {
    this.PricePurchase = 0;
    if (this.productList.length >= 6) {
      for (let index = 0; index < this.productList.length; index++) {
        this.PricePurchase += this.productList[index].priceMajor * this.productList[index].pivot.amount;
        // this.PricePurchase[index].photo = this.imgUrl.url + this.PricePurchase[index].photo;
      }
    } else {
      for (let i = 0; i < this.productList.length; i++) {
        this.PricePurchase += this.productList[i].pricePublic * this.productList[i].pivot.amount;
        // this.PricePurchase[i].photo = this.imgUrl.url + this.PricePurchase[i].photo;
      }
    }
  }

  getArrayPurchase(idClient, status, idPurchase) {
    this.purchaseService.getClientInfoPurchase(idClient, status, idPurchase).subscribe(
      response => {
        this.purchaseinfo.clientName = response.clientName;
        this.purchaseinfo.clientAddress = response.clientAddress;
        this.purchaseinfo.addressDetail = response.addressDetail;
        this.purchaseinfo.clientPhone = response.clientPhone;
        this.purchaseinfo.purchasePrice = response.purchasePrice;
        this.purchaseinfo.PurchaseShiping = response.PurchaseShiping;
        if (response.addressPurchase != null) {
          this.addressService.getAddressPurchase(response.addressPurchase).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
              this.addressPurchase = response.AddressPurchase;
            }, error => {
              console.log(<any> error);
            }
          );
        }
        this.productList = response.purchase;
        for (let index = 0; index < this.productList.length; index++) {
          this.productList[index].photo = this.imgUrl.url + this.productList[index].photo;
        }
        this.processArrayPurchase();
      }, error => {
        console.log(<any> error);
      }
    );
  }

  submitPurchaseClient() {
    const statusPurchase = 'Enviado';
    this.purchaseService.editPurchaseStatus(this.purchaseinfo.id, statusPurchase).subscribe(
      response => {
        console.log(response);
        this.toast(1);
        this.searchPurchase(statusPurchase);
      }, error => {
        console.log(<any> error);
      }
    );
  }

  toggleInfo(dataPurchase: any) {
    this.purchaseinfo.id = dataPurchase.id;
    this.viewOrdersListBool = true;
    this.getTicket();
    if (dataPurchase.status === 'Procesando') {
      this.sendBtnBool = false;
    } else {
      this.sendBtnBool = true;
    }
    console.log(dataPurchase.status, '+', this.sendBtnBool);
    this.getArrayPurchase(dataPurchase.clients_id, dataPurchase.status, dataPurchase.id);
  }

  getTicket() {
    this.purchaseService.getTicket(this.purchaseinfo.id).subscribe(
      response => {
        // agrego formato a la imagen.
        this.ticketPurchase.ticket = response.img;
        this.ticketPurchase.ticket = 'data:image/jpeg;base64,' + this.ticketPurchase.ticket;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  downloadImg() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const lengthOfCode = 10;
    this.randomChar = this.makeRandom(lengthOfCode, possible);
    // this.fileUrl = this.product.photo;
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  toast(numberBool: any) {
    switch (numberBool) {
      case 1:
        this.showSuccessOrder();
      break;

      default:
        break;
    }
  }

  showSuccessOrder() {
    this.toastr.overlayContainer = this.toastContainer;
    this.viewOrdersListBool = false;
    this.toastr.success('Orden realizada satisfactoriamente', 'Éxito', {
      timeOut: 3000,
      progressBar: true
    });
  }

    /*============================================CALCULAR_PRECIO==========================================*/

    calculatePrice(orderList: any) {
      for (let index = 0; index < this.purchaselist.length; ++index) {
        this.purchaselist[index].price = 0;
        this.totalAmount = 0;
        for (let i = 0; i < this.purchaselist[index].articles.length; i++) {
          this.totalAmount += this.purchaselist[index].articles[i].pivot.amount;
          if (this.purchaselist[index].articles[i].pivot.amount >= 6) {
            this.productCount = true;
          }
          if (this.purchaselist[index].articles.length >= 6) {
            this.productCount = true;
          } else {
            if (this.totalAmount >= 6) {
              this.productCount = true;
            }
          }
          this.calculateTotalPrice(this.productCount,index, i);
        }
      }
    }

    calculateTotalPrice(countBool, indexpurchaselist, indexProductList) {
      if (countBool !== true) {
        this.purchaselist[indexpurchaselist].price += this.purchaselist[indexpurchaselist].articles[indexProductList].pricePublic
        * this.purchaselist[indexpurchaselist].articles[indexProductList].pivot.amount;
      } else {
        this.purchaselist[indexpurchaselist].price += this.purchaselist[indexpurchaselist].articles[indexProductList].priceMajor
        * this.purchaselist[indexpurchaselist].articles[indexProductList].pivot.amount;
      }
      console.log(this.purchaselist[indexpurchaselist]);
    }
    // =======================================================================================================

  ngOnInit() {
    if (this.identity == null) {
      this.router.navigate(['LoginAdmin']);
    }
  }

}

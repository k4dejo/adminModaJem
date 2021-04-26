import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//services
import { ArticleService } from '../services/article.service';
import { SizeService } from '../services/size.service';
import { AdminService } from '../services/admin.service';
import { ApartService } from '../services/apart.service';
import { BillingService } from '../services/billing.service';
import { AddresServices } from '../services/addres.service';
import { CommonServices } from '../services/commons.services';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../services/invoice.service';



//models
import { Province } from '../models/province';
import { Cant } from '../models/cant';
import { District } from '../models/district';
import { Client } from '../models/client';
import { Article } from '../models/article';
import { Apart } from '../models/apart';
import { Gender } from '../models/gender';
import { ImgUrl } from '../models/imgUrl';
import { Departament } from '../models/department';
import { AttachApart } from '../models/attachApart';
import { Billing } from '../models/billing';
import { NgbdModalContent } from './modalClient.component';

@Component({
  selector: 'app-apart',
  providers: [ArticleService, AdminService, SizeService,
    ApartService, AddresServices, CommonServices, InvoiceService],
  templateUrl: './apart.component.html',
  styleUrls: ['./apart.component.scss']
})
export class ApartComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;
  public token;
  public billing: Billing;
  public arrayBilling;
  public date: string;
  public currentDate = new Date();
  public day;
  public month;
  public identity;
  public productSizes;
  public imgUrl = ImgUrl;
  public changeTab = true;
  public client: Client;
  public productGet: Article;
  public productView: Array<Article>;
  public attachApart: AttachApart;
  public apartM: Apart;
  public searchProduct;
  public searchClient;
  public AmountInputBool = false;
  public valueQtyBtn = 1;
  public pageCurrent = 1;
  public pClient = 1;
  public statusBool: boolean;
  public clients;
  public arrayApart;
  public viewPhoto;
  public loading = false;
  public arrayProductSize;
  public clientBool: boolean;
  public sizeId: string;
  public isDelete;
  public messageError = false;
  public subscribeTimer: any;
  public interval;
  public timeLeft = 5;
  public compareBool = true;
  public pPublic = true;
  public pMajor = false;
  public pBoutique = false;
  public shipping = 0;
  public totalPrice = 0;
  public totalWeight = 0;
  public rateGAM = 2485;
  public addGAM = 1130;
  public restRate = 3165;
  public restAdd = 1355;
  public splite;
  public idCleanApart: string;
  public PronviJson: string[] = [];
  public CantJson: string[] = [];
  public DistJson: string[] = [];
  public arrayGamDis: string[] = ['San José', 'central', 'Escazú', 'Desamparados',
    'Aserrí', 'Mora', 'Goicoechea', 'Santa Ana', 'Alajuelita', 'Vásquez de Coronado',
    'Tibás', 'Moravia', 'Montes de Oca', 'Curridabat', 'Alajuela', 'San Ramón', 'Grecia', 'Atenas',
    'Naranjo', 'Palmares', 'Poás', 'Sarchí', 'Río Cuarto', 'Cartago', 'Paraíso', 'La Unión', 'Alvarado',
    'Oreamuno', 'El Guarco', 'Heredia', 'Barva', 'Santo Domingo', 'Santa Bárbara', 'San Rafael',
    'San Isidro', 'Belén', 'Flores', 'San Pablo'];
  public ArrayProvin: Province[];
  public ArrayCant: Cant[];
  public ArrayDist: District[];
  public Province: Province;
  public Cant: Cant;
  public District: District;
  public lenghtProduct;
  public urlPaginate: any;
  public pageChange;
  public btnNextDisabled = true;
  public dataFromProductList;
  public totalPage = 1;
  public productToFind: string;
  public typeOfSellApart;
  public labelProvince = "Provincia";
  public idProvince;
  public labelCan = "Cantón";
  public idCant;
  public labelDist = "Distrito";
  public selectedClient = true;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private apartService: ApartService,
    private province: AddresServices,
    private toastr: ToastrService,
    private commonService: CommonServices,
    private billingService: BillingService,
    private modalService: NgbModal,
    private productService: ArticleService,
    private invoiceService: InvoiceService,
  ) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
    this.productGet = new Article('', '', '', 0, 0, 0, 0, '', null, '', 0, '', 0, 0, '');
    this.client = new Client('', '', '', '', '', '', '', '', null, 1);
    this.apartM = new Apart('', 0, 0, '', '', '');
    this.billing = new Billing('', 0, '', '', '', '', '', '');
    this.attachApart = new AttachApart('', '', 0, '');
  }

  //=====================================GETTING_FIRST_DATA=======================================================
  getClientList() {
    this.adminService.getClientList().subscribe(
      response => {
        this.clients = response.clients;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  addPhotoProductList() {
    for (let index = 0; index < this.productView.length; index++) {
      // agrego formato a la imagen.
      this.productView[index].photo = this.imgUrl.url + this.productView[index].photo;
    }
  }

  getProductView() {
    this.productService.getProduct().subscribe(
      response => {
        this.dataFromProductList = response.articles;
        this.urlPaginate = response.articles.next_page_url;
        this.productView = response.articles.data;
        this.totalPage = response.articles.total;
        this.statusBool = true;
        this.addPhotoProductList();
      }, error => {
        console.log(<any>error);
      }
    );
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

  selectClient(dataClient: any) {
    this.client = dataClient;
    this.selectedClient = true;
    this.billing.client = dataClient.name;
    this.billing.email = dataClient.email;
    this.billing.address = dataClient.address;
    this.billing.addressDetail = dataClient.addressDetail;
    this.billing.phone = dataClient.phone;
    this.apartM.clients_id = dataClient.id;
    this.apartM.price = 0;
    this.apartM.typeSell = 'public';
    this.apartM.status = 'incompleto';
    this.splite = this.client.address.split(',');
    this.labelProvince = this.splite[0];
    this.labelCan = this.splite[1];
    this.labelDist = this.splite[2];
    this.viewAddress(this.splite[0], this.splite[1]);
    this.authAdmin(this.client);
  }

  authAdmin(dataClient) {
    this.adminService.authAdmin(this.identity).subscribe(
      response => {
        if (response.status !== 'admin') {
          this.router.navigate(['LoginAdmin']);
        } else {
          this.apartM.admin_id = this.identity.sub;
          this.addOrGetApart(this.token, this.apartM, dataClient.id);
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

  addOrGetApart(token, apartM, clientId) {
    this.apartService.addNewApart(token, apartM).subscribe(
      response => {
        console.log(response);
        if (response.status === 'success' || response.status === 'Exist') {
          this.attachApart.apart_id = response.apart.id;
          this.typeOfSellApart = response.apart.typeSell;
          this.arrayApart = response.apart.articles;
          this.addPhotoToApartProducts();
          this.getApartClient();
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getApartClient() {
    this.calculateWeight();
    this.switchPrice(this.typeOfSellApart);
  }

  calculatePriceOfApart(typeOfSell: any) {
    this.apartM.price = 0;
    let mappingPrice = this.arrayApart.map((apartCurrent) => {
      if (typeOfSell === 'public') {
        this.apartM.price += apartCurrent.pricePublic * apartCurrent.pivot.amount; 
      } else if (typeOfSell === 'major') {
        this.apartM.price += apartCurrent.priceMajor * apartCurrent.pivot.amount;
      } else {
        this.apartM.price += apartCurrent.priceTuB * apartCurrent.pivot.amount;
      }
    });
    this.calculateWeight();
  }

  addPhotoToApartProducts() {
    for (let index = 0; index < this.arrayApart.length; index++) {
      this.arrayApart[index].photo = this.imgUrl.url + this.arrayApart[index].photo;
    }
  }

  calculateWeight() {
    this.totalWeight = 0;
    var roots = this.arrayApart.map((apartCurrent) => {
      this.totalWeight +=  Number(apartCurrent.weight) * apartCurrent.pivot.amount;
    });
    this.viewAddress(this.splite[0], this.splite[1]);
  }

  switchPrice(event: any) {
    switch (event) {
      case 'public':
        this.pPublic = true;
        this.pMajor = false;
        this.pBoutique = false;
        this.apartM.typeSell = 'public';
        this.calculatePriceOfApart(event);
        this.editApart(this.attachApart.apart_id);
        break;
      case 'major':
        this.pPublic = false;
        this.pMajor = true;
        this.pBoutique = false;
        this.apartM.typeSell = 'major';
        this.calculatePriceOfApart(event);
        this.editApart(this.attachApart.apart_id);
        break;
      case 'boutique':
        this.pPublic = false;
        this.pMajor = false;
        this.pBoutique = true;
        this.apartM.typeSell = 'boutique';
        this.calculatePriceOfApart(event);
        this.editApart(this.attachApart.apart_id);
        break;
      default:
        console.log('Fuera de rango');
        break;
    }
  }

  //===================================FINDPRODUCTS======================================================

  findProduct() {
    if (this.productToFind != '') {
      this.productService.searchProduct(this.productToFind).subscribe(
        response => {
          this.dataFromProductList = response.articles;
          this.urlPaginate = response.articles.next_page_url;
          this.productView = response.articles.data;
          this.totalPage = response.articles.total;
          this.addPhotoProductList();
        }, error => {
          console.log(<any>error);
        }
      );
    }
  }
  
  //==========================================Dirección===========================================
  getProvice() {
    this.province.getProvinceJson().subscribe(
      response => {
        // tslint:disable-next-line:forin
        for (const key in response) {
          this.PronviJson.push(response[key]);
        }
        this.getProvin();
      },
      error => {
        console.log(error);
      }
    );
  }

  getProvin() {
    let idProvin: number;
    this.ArrayProvin = [];
    for (let i = 0; i < this.PronviJson.length; ++i) {
      idProvin = i + 1;
      this.ArrayProvin.push(new Province(idProvin.toString(), this.PronviJson[i]));
    }
  }

  getCant(any) {
    if (any !== undefined) {
      this.CantJson = [];
      this.province.getCanJson(any.id).subscribe(
        response => {
          // tslint:disable-next-line:forin
          for (const key in response) {
            this.CantJson.push(response[key]);
          }
          let idCant: number;
          this.ArrayCant = [];
          for (let i = 0; i < this.CantJson.length; ++i) {
            idCant = i + 1;
            this.ArrayCant.push(new Cant(idCant.toString(), this.CantJson[i]));
          }
          this.labelProvince = any.name;
          this.idProvince = any.id;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getDist(direcPro, direCan) {
    if (direCan !== undefined) {
      this.DistJson = [];
      this.province.getDistJson(direcPro, direCan).subscribe(
        response => {
          // tslint:disable-next-line:forin
          for (const key in response) {
            this.DistJson.push(response[key]);
          }
          let idDist: number;
          this.ArrayDist = [];
          for (let i = 0; i < this.DistJson.length; ++i) {
            idDist = i + 1;
            this.ArrayDist.push(new District(idDist.toString(), this.DistJson[i]));
          }
          this.labelCan = direCan.name;
          this.idCant = direCan.id;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  //before pushAddress(idProvin, idCant, idDist) {
  pushAddress(idDist) {
    let idProvin = this.idProvince;
    let idCant = this.idCant;
    this.labelDist = idDist.name;
    if (idCant !== undefined && idDist !== undefined) {
      let idReal: number;
      for (let i = 0; i < this.PronviJson.length; ++i) {
        idReal = i + 1;
        if (idReal.toString() === idProvin) {
          this.client.address = this.PronviJson[i];
          this.billing.address = this.PronviJson[i];
        }
      }
      for (let i = 0; i < this.CantJson.length; ++i) {
        idReal = i + 1;
        if (idReal.toString() === idCant) {
          this.client.address = this.client.address + ', ' + this.CantJson[i];
          this.billing.address = this.billing.address + ', ' + this.CantJson[i];
        }
      }
      for (let i = 0; i < this.DistJson.length; ++i) {
        idReal = i + 1;
        if (idReal.toString() === idDist) {
          this.client.address = this.client.address + ', ' + this.DistJson[i];
          this.billing.address = this.billing.address + ', ' + this.DistJson[i];
        }
      }
    }
    this.splite = this.client.address.split(', ');
    this.viewAddress(this.splite[0], this.splite[1]);
  }

  searchGamDist(dis) {
    for (let index = 0; index < this.arrayGamDis.length; index++) {
      const arrayDisGam = this.arrayGamDis[index].toString();
      if (dis === arrayDisGam) {
        return true;
        break;
      }
    }
    return false;
  }

  viewAddress(province: any, district: any) {
    const responseSearch = this.searchGamDist(district);
    switch (province) {
      case 'San José':
        if (responseSearch) {
          this.shippingCalculate(this.totalWeight, this.rateGAM, this.addGAM);
        } else {
          this.shippingCalculate(this.totalWeight, this.restRate, this.restAdd);
        }
        break;
      case 'Alajuela':

        if (responseSearch) {
          this.shippingCalculate(this.totalWeight, this.rateGAM, this.addGAM);
        } else {
          this.shippingCalculate(this.totalWeight, this.restRate, this.restAdd);
        }
        break;
      case 'Guanacaste':
        this.shippingCalculate(this.totalWeight, this.restRate, this.restAdd);
        break;
      case 'Heredia':
        if (responseSearch) {
          this.shippingCalculate(this.totalWeight, this.rateGAM, this.addGAM);
        } else {
          this.shippingCalculate(this.totalWeight, this.restRate, this.restAdd);
        }
        break;
      case 'Puntarenas':
        this.shippingCalculate(this.totalWeight, this.restRate, this.restAdd);
        break;
      case 'Limón':
        this.shippingCalculate(this.totalWeight, this.restRate, this.restAdd);
        break;
      case 'Cartago':
        if (responseSearch) {
          this.shippingCalculate(this.totalWeight, this.rateGAM, this.addGAM);
        } else {
          this.shippingCalculate(this.totalWeight, this.restRate, this.restAdd);
        }
        break;
      default:
        // tslint:disable-next-line:no-unused-expression
        'fuera de rango de zona';
        break;
    }
  }

  shippingCalculate(weight: any, rate: any, additional: any) {
    this.shipping = 0;
    if (weight <= 1 && weight > 0) {
      this.shipping += rate;
    }
    if (weight > 1) {
      const weightAdditional = weight - 1;
      this.shipping += rate + (weightAdditional * additional);
    }
    this.billing.price += this.shipping;
  }

  //=========================GET_PRODUCT_FOR_PURCHASE==============================================

  getProduct(productId: any) {
    this.loading = true;
    this.productService.getProductU(productId).subscribe(
      response => {
        this.productGet = response.articles;
        this.arrayProductSize = response.arraySizeArticle;
        this.loading = false;
        this.getSizeProduct(productId);
      }, error => {
        console.log(<any>error);
      }
    );
  }

  getSizeProduct(idProduct: any) {
    this.productService.getProductSizeList(idProduct).subscribe(
      response => {
        this.productSizes = response.article;
        if (this.AmountInputBool = true) {
          this.AmountInputBool = false;
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

  //========================================TOASTR============================================================
  toast(numberbool: any) {
    switch (numberbool) {
      case 1:
        this.showSuccess();
        break;
      default:
        break;
    }
  }

  showSuccess() {
    this.toastr.overlayContainer = this.toastContainer;
    this.toastr.success('Se ha añadido correctamente', 'Éxito', {
      timeOut: 3000,
      progressBar: true
    });
  }

  showError(error) {
    if (error.error.address[0] === 'The address field is required.') {
      this.toastr.overlayContainer = this.toastContainer;
      this.toastr.error('El campo dirección es requerido',
        'Error', {
        timeOut: 4000,
        progressBar: true
      });
      this.loading = false;
    }
  }

  showTokenExpire() {
    this.toastr.overlayContainer = this.toastContainer;
    this.toastr.error('La sesión ha expirado, por favor cerra sesión y vuelve a intentar',
      'Error', {
      timeOut: 4000,
      progressBar: true
    });
    this.loading = false;
  }

  showErrorAdmin(error) {
    this.toastr.overlayContainer = this.toastContainer;
    this.toastr.error(error,
      'Error', {
      timeOut: 4000,
      progressBar: true
    });
    this.loading = false;
  }

  // =============================Facturacion===============================
  addNewFact() {
    this.loading = true;
    this.apartM.price += this.shipping;
    this.apartM.status = "completo";
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
    this.invoiceService.getInvoice(this.shipping, this.attachApart.apart_id).subscribe(
      response => {
      }, error => {
        console.log(<any>error);
      }
    );
  }

  editShipping(e: any) {
    this.shipping = e.target.value;
  }

  //==================================GET_PRODUCT_FOR_PURCHASE_APART======================================
  checkoutApart(productGet: any) {
    if (this.pPublic) {
      this.apartM.price += productGet.pricePublic * this.valueQtyBtn;
    }
    if (this.pMajor) {
      this.apartM.price += productGet.priceMajor * this.valueQtyBtn;
    }
    if (this.pBoutique) {
      this.apartM.price += productGet.priceTuB * this.valueQtyBtn;
    }
    this.attachApart.amount = this.valueQtyBtn;
    this.isDelete = 'add';
    this.compareAmountInAdd(this.sizeId, productGet.id, this.attachApart.amount);
  }

  compareAmountInAdd(sizeId, productId, amountCompare) {
    this.apartService.compareAmountSizeProduct(sizeId, productId, amountCompare).subscribe(
      response => {
        if (response.amountCheck === 'success') {
          this.AmountInputBool = true;
          this.compareBool = true;
          this.messageError = false;
          this.attachApart.article_id = productId;
          console.log(this.attachApart);
          this.attachApartProduct(this.token, this.attachApart, productId);
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  attachApartProduct(token: any, dataApart: any, productId) {
    this.loading = true;
    this.apartService.attachProductApart(token, dataApart).subscribe(
      response => {
        if (response.status === 'success') {
          this.editAmountProduct(productId, this.sizeId, this.isDelete, this.attachApart);
          this.editApart(dataApart.apart_id);
          this.loading = false;
        }  
      }, error => {
        console.log(<any> error);
      }
    );
  }

  detachProductBilling(product: any) {
    this.attachApart.size = product.pivot.size;
    this.attachApart.article_id = product.id;
    const arrayDetach = this.attachApart;
    arrayDetach.amount = product.pivot.amount;
    this.apartService.dettachProductApart(arrayDetach).subscribe(
      response => {
        this.restProduct(product);
        this.calculateWeight();
        this.checkSizeApart(product.id, product.pivot.size, arrayDetach);
        this.editApart(response.apart.id);
      }, error => {
        console.log(<any>error);
      }
    );
  }

  restProduct(product) {
    if (this.pPublic) {
      this.apartM.price -= product.pricePublic * product.pivot.amount; 
    } else if(this.pMajor) {
      this.apartM.price -= product.priceMajor * product.pivot.amount;
    } else {
      this.apartM.price -= product.priceTuB * product.pivot.amount;
    }
  }

  checkSizeApart(productId, size, productApart) {
    this.apartService.checkSizeIdApart(productId, size).subscribe(
      response => {
        if (response.status === 'success') {
          this.isDelete = 'rest';
          this.editAmountProduct(productId, response.sizeId, this.isDelete, productApart);
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

  editAmountProduct(idProduct: any, sizeId, isDelete, product) {
    this.loading = true;

    this.apartService.updateAmountApart(this.token, idProduct, sizeId, isDelete, product).subscribe(
      response => {
        if (response.code === 200) {
          if (response.status === 'success') {
            this.loading = false;
          }
        } else if (response.code === 400) {
          if (response.status === 'fail') {
            this.showTokenExpire();
          }
          this.loading = false;
        }
      }, error => {
        console.log(<any> error);
        this.showErrorAdmin(error);
      }
    );
  }

  editApart(IdApart: any) {
    this.apartM.id = IdApart;
    this.billing.price = this.apartM.price;
    this.apartService.editApart(this.token, this.apartM).subscribe(
      response => {
        this.getApart(IdApart);
      },
      error => { console.log(<any>error); }
    );
  }

  getApart(apartId: any) {
    this.idCleanApart = apartId;
    this.apartService.getApart(apartId).subscribe(
      response => {
        this.arrayApart = response.apart;
        let addPhoto = this.arrayApart.map((currentApart) => {
          currentApart.photo = this.imgUrl.url + currentApart.photo;
        });
        this.calculateWeight();
      }, error => {
        console.log(<any>error);
      }
    );
  }


  sizeAdd(sizeId: any, productId: any) {
    const idProduct = productId.id;
    this.attachApart.size = sizeId.size;
    this.sizeId = sizeId.id;
    this.checkAmountSizesProduct(sizeId.id, productId.id);
  }

  checkAmountSizesProduct(sizeId, productId) {
    this.apartService.checkAmountProduct(sizeId, productId).subscribe(
      response => {
        if (response.amountCheck === 'success') {
          this.AmountInputBool = true;
        } else {
          this.AmountInputBool = false;
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

  //==================================utilities======================================

  over(idProduct: any) {
    this.loading = true;
    this.productService.showPhotoProduct(idProduct).subscribe(
      response => {
        this.loading = false;
        // this.viewPhoto = response.productPhoto;
        this.viewPhoto = this.imgUrl.url + response.productPhoto;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.messageError = false;
        }
      }
    }, 500);
  }

  nextPaginate(event: any) {
    this.pageCurrent = event;
    let nextPage = this.urlPaginate;
    const urlSplit = nextPage.split('=');
    this.pageChange = urlSplit[0] + '=' + event;
    this.loading = true;
    this.productService.getPaginateProduct(this.pageChange).subscribe(
      response => {
        if (response.articles.next_page_url === null) {
          this.btnNextDisabled = false;
          this.dataFromProductList = response.articles.last_page_url;
        } else {
          this.urlPaginate = response.articles.next_page_url;
        }
        this.loading = false;
        this.productView = response.articles.data;
        this.addPhotoProductList();
      }, error => {
        console.log(<any>error);
      }
    );
  }

  gotoFact() {
    this.router.navigate(['admin/facturación']);
  }

  gotobill() {
    //console.log(this.apartM);
    this.router.navigate(['facturar', this.apartM.id, this.shipping]);
  }

  openSelectedClient() {
    this.selectedClient = false;
  }

  closeSelectedClient() {
    this.selectedClient = true;
  }

  ngOnInit() {
    if (this.identity == null) {
      this.router.navigate(['LoginAdmin']);
    } else {
      this.getClientList();
      this.getProvice();
      this.getDate();
      this.getProductView();
    }
  }

  /*checkoutApart(productGet: any) {
    if (this.pPublic) {
      this.apartM.price += productGet.pricePublic * this.valueQtyBtn;
    }
    if (this.pMajor) {
      this.apartM.price += productGet.priceMajor * this.valueQtyBtn;
    }
    if (this.pBoutique) {
      this.apartM.price += productGet.priceTuB * this.valueQtyBtn;
    }
    this.billing.price = this.apartM.price;
    this.attachApart.amount = this.valueQtyBtn;
    this.isDelete = 'add';
    this.compareAmountInAdd(this.sizeId, productGet.id, this.attachApart.amount);
  }

  compareAmountInAdd(sizeId, productId, amountCompare) {
    this.apartService.compareAmountSizeProduct(sizeId, productId, amountCompare).subscribe(
      response => {
        if (response.amountCheck === 'success') {
          this.AmountInputBool = true;
          this.compareBool = true;
          this.messageError = false;
          this.editAmountProduct(productId, this.sizeId, this.isDelete, this.attachApart);
          this.apartService.addNewApart(this.token, this.apartM).subscribe(
            responseApart => {
              if (responseApart.status === 'success' || responseApart.status === 'Exist') {
                // this.attachApart.amount = this.valueQtyBtn;
                this.attachApart.article_id = productId;
                this.attachApart.apart_id = responseApart.apart.id;
                //this.attachApartProduct(this.token, this.attachApart);
              }
            }, error => {
              console.log(<any> error);
              this.showErrorAdmin(error);
            }
          );
        } else {
          this.AmountInputBool = false;
          this.compareBool = false;
          this.messageError = true;
          this.startTimer();
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  editAmountProduct(idProduct: any, sizeId, isDelete, product) {
    this.loading = true;
    this.apartService.updateAmountApart(this.token, idProduct, sizeId, isDelete, product).subscribe(
      response => {
        if (response.status === 'success') {
          this.loading = false;
        }
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(<any> error);
        //configurar toast de ngboostrap
        this.showErrorAdmin(error);
      }
    );
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.messageError = false;
        }
      }
    }, 500);
  }
  
  //==========================================Dirección===========================================
    getProvice() {
      this.province.getProvinceJson().subscribe(
        response => {
          // tslint:disable-next-line:forin
          for (const key in response) {
           this.PronviJson.push(response[key]);
          }
          this.getProvin();
        },
        error => {
          console.log(error);
        }
      );
    }
  
    getProvin() {
      let idProvin: number;
      this.ArrayProvin = [];
      for (let i = 0; i < this.PronviJson.length; ++i) {
        idProvin = i + 1;
        this.ArrayProvin.push(new Province(idProvin.toString(), this.PronviJson[i]));
      }
    }
  
    getCant(any) {
      if (any.id !== undefined) {
        this.CantJson = [];
        this.province.getCanJson(any.id).subscribe(
          response => {
            // tslint:disable-next-line:forin
            for (const key in response) {
             this.CantJson.push(response[key]);
            }
            let idCant: number;
            this.ArrayCant = [];
            for (let i = 0; i < this.CantJson.length; ++i) {
              idCant = i + 1;
              this.ArrayCant.push(new Cant(idCant.toString(), this.CantJson[i]));
            }
            this.labelProvince = any.name;
            this.idProvince = any.id;
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  
    getDist(direCan) {
      if (direCan.id !== undefined) {
        this.DistJson = [];
        this.province.getDistJson( this.idProvince, direCan.id).subscribe(
          response => {
            // tslint:disable-next-line:forin
            for (const key in response) {
             this.DistJson.push(response[key]);
            }
            let idDist: number;
            this.ArrayDist = [];
            for (let i = 0; i < this.DistJson.length; ++i) {
              idDist = i + 1;
              this.ArrayDist.push(new District(idDist.toString(), this.DistJson[i]));
            }
            this.labelCan = direCan.name;
            this.idCant = direCan.id;
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  
    pushAddress(idDist) {
      const idProvin = this.idProvince;
      const idCant = this.idCant;
      this.labelDist = idDist.name;
      if (idCant !== undefined && idDist.id !== undefined) {
        let idReal:  number;
        for (let i = 0; i < this.PronviJson.length; ++i) {
          idReal = i + 1;
          if (idReal.toString() === idProvin) {
             this.client.address = this.PronviJson[i];
             this.billing.address = this.PronviJson[i];
           }
        }
        for (let i = 0; i < this.CantJson.length; ++i) {
         idReal = i + 1;
         if (idReal.toString() === idCant) {
           this.client.address = this.client.address + ', ' + this.CantJson[i];
           this.billing.address = this.billing.address + ', ' + this.CantJson[i];
         }
        }
        for (let i = 0; i < this.DistJson.length; ++i) {
         idReal = i + 1;
         if (idReal.toString() === idDist.id) {
           this.client.address = this.client.address + ', ' + this.DistJson[i];
           this.billing.address = this.billing.address + ', ' + this.DistJson[i];
         }
        }
      }
      this.splite = this.client.address.split(', ');
      //this.viewAddress(this.splite[0] , this.splite[1]);
    }
  
  
  //=======================================================================================

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    console.log(modalRef);
    modalRef.componentInstance.name = 'World';
  }

  switchPrice(option: number) {

  }

  showErrorAdmin(error) {
    this.toastr.overlayContainer = this.toastContainer;
    this.toastr.error(error,
    'Error', {
      timeOut: 4000,
      progressBar: true
    });
    this.loading = false;
  }

  getProductView() {
    this.productService.getProduct().subscribe(
      response => {
        this.productView = response.articles;
        this.statusBool = true;
        this.addPhotoProductList();
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getProduct(productId: any) {
    this.loading = true;
    this.productService.getProductU(productId).subscribe(
      response => {
        this.productGet = response.articles;
        this.arrayProductSize = response.arraySizeArticle;
        this.loading = false;
        this.getSizeProduct(productId);
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getSizeProduct(idProduct: any) {
    this.productService.getProductSizeList(idProduct).subscribe(
      response => {
        this.productSizes = response.article;
        if (this.AmountInputBool = true) {
          this.AmountInputBool = false;
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  addPhotoProductList() {
    for (let index = 0; index < this.productView.length; index++) {
      // agrego formato a la imagen.
      this.productView[index].photo = this.imgUrl.url + this.productView[index].photo;
      this.getDepartmentView(this.productView[index].gender.toString());
      this.getGenderString(this.gender.length, index);
      for (let indexD = 0; indexD < this.department.length; indexD++) {
        if (this.productView[index].department.toString() === this.department[indexD].id) {
          this.productView[index].department = this.department[indexD].name;
        }
      }
    }
  }

  //=====================================DTP_GENDERS==================================================
  getDepartmentView(idGender: any) {
    switch (idGender) {
      case '1':
        this.fillDepartment(this.dtDepartmentM);
      break;
      case '2':
        this.fillDepartment(this.dtDepartmentW);
      break;
      case '3':
        this.fillDepartment(this.dtDepartmentBG);
      break;
      case '4':
        this.fillDepartment(this.dtDepartmentBG);
      break;
      default:
        console.log('Fuera de rango');
      break;
    }
  }

  getGenderString(genderLength: any, productGenIndex: any) {
    for (let index = 0; index < genderLength; index++) {
      if (this.productView[productGenIndex].gender.toString() === this.gender[index].id) {
        this.productView[productGenIndex].gender = this.gender[index].name;
      }
    }
  }

  fillDepartment(data = []) {
    let dptId: number;
    this.department = [];
    for (let i = 0; i < data.length; ++i) {
      dptId = i + 1;
      this.department.push(new Departament(dptId.toString(), data[i]));
    }
  }

  getGender() {
    let idGender: number;
    this.gender = [];
    for (let i = 0; i < this.dataGender.length; ++i) {
      idGender = i + 1;
      // this.gender.push(new Gender(idGender.toString(), this.dataGender[i]));
    }
  }


  //=============================================================================

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

  nextPaginate(event: any) {
    this.loading = true;
    this.p = event;
    this.loading = false;
  }

  catchClient() {
    this.adminService.getClientList().subscribe(
      response => {
        this.clients = response.clients;
      }, error => {
        console.log(<any> error);
      }
    );
    console.log( this.clients);
    console.log(this.clients);
    this.commonService.sendClientObservables.subscribe(
      response => {
        this.client = response;
        console.log(response)
      }
    );
  }

  sizeAdd(size, productGet) {

  }


  ngOnInit(): void {
    if (this.identity == null) {
      this.router.navigate(['LoginAdmin']);
    } else {
      this.getGender();
      this.getProductView();
      this.getDate();
      this.getProvice();
      //this.catchClient();
      this.commonService.sendClientObservables.subscribe(
        response => {
          this.client = response;
          console.log(this.commonService.client);
        }
      );
    }
  }*/

}

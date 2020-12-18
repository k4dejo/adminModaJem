import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ArticleService } from '../services/article.service';
import { SizeService } from '../services/size.service';
import { AdminService } from '../services/admin.service';
import { ApartService } from '../services/apart.service';
import { BillingService } from '../services/billing.service';
import { AddresServices } from '../services/addres.service';
import { CommonServices } from '../services/commons.services';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

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
    ApartService, AddresServices, CommonServices],
  templateUrl: './apart.component.html',
  styleUrls: ['./apart.component.scss']
})
export class ApartComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
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
  public p = 1;
  public pClient = 1;
  public statusBool: boolean;
  public clients;
  public arrayApart;
  public viewPhoto;
  public loading = false;
  public arrayProductSize;
  public dtDepartmentM: string[] = ['Levis de hombre',
    'Pantalones',
    'Camisa',
    'Short',
    'Camisetas',
    'Abrigos',
    'Accesorios'
  ];
  public dtDepartmentW: string[] = [
    'Blusas',
    'Short',
    'Enaguas',
    'Pantalones',
    'Levis de dama',
    'Vestidos de baño',
    'Salidas de playa',
    'Abrigos y sacos',
    'Accesorios',
    'Camisetas',
    'Enterizos',
    'Vestidos'
  ];
  public dtDepartmentBG: string[] = ['Superior', 'Inferior', ' Enterizos'];
  public gender: Gender[];
  public department: any[];
  public dataGender: string[] = ['Hombre', 'Mujer', 'Niño', 'Niña'];
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
  public btnNextDisabled =  true;
  public labelProvince = 'Provincia';
  public labelCan = 'Cantón';
  public labelDist = 'Distrito';
  public idProvince;
  public idCant;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private apartService: ApartService,
    private province: AddresServices,
    private toastr: ToastrService,
    private commonService: CommonServices,
    private billingService: BillingService,
    private modalService: NgbModal,
    private productService: ArticleService
  ) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
    this.productGet = new Article('', '', '', 0, 0, 0, 0, '', null, '', 0, '', 0, 0, '');
    this.client = new Client('', '', '', '', '', '', '', '', null, 1);
    this.apartM = new Apart('', 0, '');
    this.billing = new Billing('', 0, '', '', '', '', '', '');
    this.attachApart = new AttachApart('', '', 0, '');
  }

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
    /*==========================================Dirección===========================================*/
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
  
  
    /*=======================================================================================*/

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
  }

}

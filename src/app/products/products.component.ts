import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { SizeService } from '../services/size.service';
import { Article } from '../models/article';
import { Size } from '../models/size';
import { Attachsize } from '../models/attachsize';
import { Gender } from '../models/gender';
import { Departament } from '../models/department';
import { AmounTotal } from '../models/amounTotal';
import { Image } from '../models/image';
import { ImgUrl } from '../models/imgUrl';
import { ImageService } from '../services/image.service';
import { AdminService } from '../services/admin.service';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { GenderDepartmentService } from '../services/gender-department.service';


@Component({
  selector: 'app-products',
  providers: [ArticleService, AdminService, ImageService, GenderDepartmentService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  public product: Article;
  public imgUrl = ImgUrl;
  public p = 1;
  public searchProduct;
  public loading = false;
  public primaryColour = '#ffffff';
  public secondaryColour = '#ccc';
  public PrimaryRed = '#dd0031';
  public SecondaryBlue = '#006ddd';
  public size: Size;
  public images: Image;
  public attachSizeProduct: Attachsize;
  public attachSizeArray: Attachsize;
  public productView: Array<Article>;
  public productViewU: Article;
  public productRelation: Attachsize[] = [];
  public department: Departament[];
  public dtp;
  public genderApi;
  /*public dtDepartmentM: string[] = [
    'Pantalones',
    'Jeans',
    'Camisas',
    'Short',
    'Camisetas',
    'Abrigos',
    'Accesorios',
    'Gorras',
    'Zapatos'
  ];
  public dtDepartmentW: string[] = [
    'Blusas',
    'Shorts',
    'Enaguas',
    'Conjuntos',
    'Pantalones de tela',
    'Jeans',
    'Ropa Interior y Lencería',
    'Vestidos de baño',
    'Salidas de playa',
    'Abrigos y sacos',
    'Pijamas',
    'Accesorios',
    'Camisetas',
    'Enterizos',
    'Overol',
    'Sueters',
    'Joyería ',
    'Vestidos',
    'Zapatos'
   ];
  public dtDepartmentG: string[] = [
    'Mamelucos',
    'Accesorios',
    'Blusas',
    'Abrigos',
    'Shorts',
    'Enaguas',
    'Conjuntos',
    'Vestidos',
    'Overol',
    'Enterizos',
    'Pijamas'
  ];
  public dtDepartmentB: string[] = [
    'Mamelucos',
    'Accesorios',
    'Camisetas',
    'Camisas',
    'Shorts',
    'Conjuntos',
    'Pijamas',
    'Pantalones',
    'Abrigos'
  ];
  public gender: Gender[];
  public dataGender: string[] = ['Hombre', 'Mujer', 'Niño', 'Niña'];*/
  public img;
  public status: string;
  public statusBool: boolean;
  public justNumber: number;
  public justString: string;
  public fileNpm: File[] = [];
  public imgtest: File = null;
  public fileBlob;
  public blobImgArray;
  public warningSize = false;
  public warningAmount = false;
  public sizeResponse;
  public productRespose;
  public sizeSelect;
  public amountT;
  public amountTotal: AmounTotal;
  public token;
  public identity;
  public checkMark = false;
  public subscribeTimer: any;
  public interval;
  public timeLeft = 5;
  public tags: any;
  public viewPhoto;
  public sizesList;
  public dptSearch;
  public genderSearch;
  public newStateDpt;
  public newStateGender;
  public preStateDpt;
  public preStateGender;
  public newStateSize;
  public imgResultBeforeCompress: string;
  public imgResultAfterCompress: string;
  public sizeBeforeCompress;
  public sizeAfterCompress;
  public newBlob;
  public dataFromProductList;
  public totalPage = 0;
  public pageChange;
  public btnNextDisabled = true;
  public urlPaginate: any;
  public concat = '';
  public productToFind: string;
  public genderLabel = 'Género';
  public dtpLabel = 'Departamento';
  public brandLabel = 'Marcas';

  constructor(
    private route:            ActivatedRoute,
    private toastr:           ToastrService,
    private router:           Router,
    private sizeService:      SizeService,
    private adminService:     AdminService,
    private imagesService:    ImageService,
    private imageCompress:    NgxImageCompressService,
    private productService:   ArticleService,
    private genderDptService: GenderDepartmentService
  ) {
    this.images = new Image('', '', null);
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
    this.size = new Size('', 0);
    this.amountTotal = new AmounTotal(0, 0);
    this.attachSizeProduct = new Attachsize('', '', [], 0);
    this.product = new Article('', '', '', 0, 0, 0, 0, '', null, '', 0, '', 0, 0, '');
    this.productViewU = new Article('', '', '', 0, 0, 0, 0, '', null, '', 0, '', 0, 0, '');
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  /*===============================Direccion_From_API========================================*/

  getGenderApi() {
    this.genderDptService.getAllGender().subscribe(
      response => {
        this.genderApi = response.genders;
        console.log(this.genderApi);
      }, error => {
        console.log(<any> error);
      }
    );
  }

  pushGenderApi(idGender: any) {
    this.genderLabel = idGender.gender;
    this.genderDptService.getDepartmentForGender(idGender.id).subscribe(
      response => {
        this.dtp = response.department;
        this.product.gender_id = idGender;
        this.product.gender = idGender;

      }, error => {
        console.log(<any> error);
      }
    );
  }

  pushDepartmentApi(department: any) {
    this.product.dpt_id = department.id;
    this.dtpLabel = department.department;
    this.product.department = department.department;
  }

  /*=========================================================================================== */

  /* compressFile() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const lengthOfCode = 10;
    this.product.photo = this.makeRandom(lengthOfCode, possible);
    console.log(this.product.photo);
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imgResultBeforeCompress = image;
      this.imageCompress.compressFile(image, orientation, 80, 65).then(
        result => {
          // console.log(result);
          this.imgResultAfterCompress = result;
          this.fileBlob = result;
        }
      );

    });
  }*/

  onSelect(event) {
    this.fileNpm.push(...event.addedFiles);
    const imgfiles = event.addedFiles;
    this.img = imgfiles[0];
  }

  convertFileBlob() {
    for (let index = 0; index < this.fileNpm.length; index++) {
      const promise = this.getFileBlob(this.fileNpm[index]);
      promise.then(Blob => {
        this.blobImgArray = Blob;
        this.images.name = this.fileNpm[index].name;
        this.images.file = this.blobImgArray;
        this.imagesService.add(this.token, this.images).subscribe(
          response => {
            this.fileNpm = [];
          },
          error => {
            console.log(<any> error);
          }
        );
      });
    }
  }

  getFileBlob(file) {
    const reader = new FileReader();
    return new Promise (function(resolve, reject) {
      reader.onload = (function(theFile) {
        return function(e) {
          resolve(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    });
  }

  compressFile() {
    this.loading = true;
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      const myImg = image;
      orientation = 0;
      console.log(myImg);
      this.imgResultBeforeCompress = image;
      this.sizeBeforeCompress = this.formatBytes(this.imageCompress.byteCount(image));
      let sizesFile = this.sizeBeforeCompress.split(' ');
      const typeFile = sizesFile[1];
      sizesFile = sizesFile[0];
      if (typeFile === 'MB') {
        document.getElementById('openModalButton').click();
        this.compressImg(image, orientation);
      } else {
        if (typeFile === 'KB' && sizesFile > 500) {
          this.compressImg(image, orientation);
        } else {
          this.fileBlob = image;
        }
      }
    });
    this.loading = false;
  }



  compressImg(image, orientation) {
    this.imageCompress.compressFile(image, orientation, 80, 80).then(
      result => {
        this.imgResultAfterCompress = result;
        this.sizeAfterCompress = this.formatBytes(this.imageCompress.byteCount(result));
      }
    );
  }

  choseImg(img) {
    this.fileBlob = img;
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) { return '0 Bytes'; }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }

  onUpload(e) {
    console.log(e.target.files);
    const myImg = e.target.files[0];
    this.product.photo = myImg.name;
    console.log(this.product.photo);
    const promise = this.getFileBlob(myImg);
    promise.then(Blob => {
      this.fileBlob = Blob;
    });
  }

  onRemove(event) {
    this.fileNpm.splice(this.fileNpm.indexOf(event), 1);
  }

  onRemoveP() {
    this.imgtest = null;
  }

  testSubmit(form) {
    form.reset();
  }

  saveSizeAmount(sizeArray) {
    this.size.size = sizeArray.size;
    this.size.amount = sizeArray.amount;
    this.attachSizeProduct.amount = sizeArray.amount;
    this.warningAmount = false;
    this.warningSize = false;
    if (this.size.amount > 0 && this.size.size !== undefined) {
      this.saveSizeService();
      this.warningAmount = false;
      this.warningSize = false;
    }
    if (this.size.amount <= 0 || this.size.amount === undefined) {
      this.warningAmount = true;
    }
    if (this.size.size === undefined) {
      this.warningSize = true;
    }
  }

  saveSizeService() {
    this.sizeService.addSize(this.size).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = response.status;
          this.sizeResponse = response.size;
          this.checkMark = true;
          this.attachSizeProduct.size_id = this.sizeResponse.id;
          // vaciar formulario
          this.size = new Size('', 0);
          this.startTimer();
        }
        if (response.status === 'Exists') {
          this.status = 'duplicate';
          this.sizeResponse = response.size;
          this.checkMark = true;
          this.attachSizeProduct.size_id = this.sizeResponse.id;
          // vaciar formulario
          this.size = new Size('', 0);
          this.startTimer();
        } else {
         this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.checkMark = false;
        }
      }
    }, 500);
  }

  pushTag(dataTag: any) {
    if (dataTag !== undefined) {
      this.brandLabel = dataTag.name;
      this.product.tags_id = dataTag.toString();
    }
    console.log(dataTag);
  }

  attachSizesProduct(attachSizeProduct) {
    this.sizeService.attachSizeProduct(attachSizeProduct).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      response => {
        const respuesta = response;
        if (response.status === 'success') {
          console.log(respuesta.status);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // =======================================SEARCHING_FILTERS==============================================

  cleanFilter() {
    this.p = 1;
    this.newStateDpt = 0;
    this.newStateGender = 0;
    this.newStateSize = 0;
    this.getProductView();
  }


  getOnlyGender(gender: any) {
    this.loading = true;
    this.productService.getProductGender(gender).subscribe(
      response => {
        this.productView = response.articles.data;
        this.dataFromProductList = response.articles;
        this.urlPaginate = response.articles.next_page_url;
        this.totalPage = response.articles.total;
        this.addPhotoProductList();
        this.loading = false;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getOnlydpt(gender, dtp) {
    this.loading = true;
    this.productService.Onlydepart(gender, dtp).subscribe(
      response => {
        this.productView = response.articles.data;
        this.dataFromProductList = response.articles;
        this.urlPaginate = response.articles.next_page_url;
        this.totalPage = response.articles.total;
        this.addPhotoProductList();
        this.loading = false;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  pushGenderSearch(genderParam: any) {
    if (genderParam !== undefined) {
      this.genderLabel = genderParam.name;
      this.genderSearch = genderParam.toString();
      this.preStateGender = this.newStateGender;
      this.getDepartmentData(this.genderSearch);
      this.newStateGender = genderParam;
      this.getOnlyGender(this.genderSearch);
      // this.getDepartment();
    }
  }

  pushDepartSearch(departmentParam: any) {
    if (departmentParam !== undefined) {
      this.dtpLabel = departmentParam.name;
      this.dptSearch = departmentParam.toString();
      this.preStateDpt = this.newStateDpt;
      this.newStateDpt = departmentParam;
      this.getOnlydpt(this.genderSearch, departmentParam);
      this.getSizesForDepartment(this.genderSearch, this.dptSearch);
    }
  }

  getDepartmentData(genderId) {
    this.genderDptService.getDepartmentForGender(genderId).subscribe(
      response => {
        this.department = response.department; 
      }, error => {
        console.log(<any> error);
      }
    );
  }

  selectedOptionDpt(option) {
    return this.newStateDpt === option;
  }

  selectedOptionGender(option) {
    return this.newStateGender === option;
  }

  selectedOptionSizes(option) {
    return this.newStateSize === option;
  }

  getSizesForDepartment(gender, department) {
    this.sizeService.getSizesForDepart(gender, department).subscribe(
      response => {
        this.sizesList = response.getSizesDeparment;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  filterSizeProduct(e: any) {
    this.newStateSize = e;
    this.loading = true;
    const sizesTem = e.split('/');
    if (sizesTem.length >= 2) {
      const sendSizes = sizesTem[0] + '-' + sizesTem[1];
      e = sendSizes;
    }
    this.productService.filterSizeProductAdmin(this.dptSearch, this.genderSearch, e).subscribe(
      response => {
        this.productView = response.filter;
        this.productView = response.filter.data;
        this.dataFromProductList = response.filter;
        this.urlPaginate = response.filter.next_page_url;
        this.totalPage = response.filter.total;
        this.loading = false;
        this.addPhotoProductList();
      }, error => {
        console.log(<any>error);
      }
    );
  }

  // ==================================================================================
  addProductService(token, product, form) {
    this.productService.add(token, product).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = response.status;
          this.productRespose = response.article;
          this.attachSizeProduct.product_id = this.productRespose.id;
          this.images.id = this.productRespose.id;
          if (this.fileNpm.length > 0) {
            this.convertFileBlob();
          }
          this.attachSizesProduct(this.attachSizeProduct);
          // vaciar formulario
          this.product = new Article('', '', '', 0, 0, 0, 0, '', null, '', 0, '', 0, 0, '');
          this.department = [];
          // this.getGender();
          this.fileBlob = 'assets/Images/default.jpg';
          this.newBlob = 'assets/Images/default.jpg';
          this.getProductView();
          this.loading = false;
          form.reset();
          this.toast(1);
        } else {
          if (response.status === 'duplicate') {
            this.status = 'duplicate';
          } else {
            this.status = 'error';
            this.toast(2);
          }
        }
      }, error => {
        this.loading = false;
        console.log(<any>error);
        this.toast(2);
      }
    );

  }

  saveProduct(form) {
    this.product.file = this.fileBlob;
    this.product.photo = this.product.name + '.jpg';
    this.productRelation = [];
    if (this.product.tags_id === undefined) {
      this.product.tags_id = '0';
    }
    this.loading = true;
    if (this.identity == null) {
      this.router.navigate(['LoginAdmin']);
    } else {
      this.adminService.authAdmin(this.identity).subscribe(
        response => {
          if (response.status !== 'admin') {
            this.router.navigate(['LoginAdmin']);
          } else {
            this.addProductService(this.token, this.product, form);
          }
        }, error => {
          console.log(<any> error);
        }
      );
    }
  }

  /*getDepartmentView(idGender: any) {
    switch (idGender) {
      case '1':
        this.fillDepartment(this.dtDepartmentM);
      break;
      case '2':
        this.fillDepartment(this.dtDepartmentW);
      break;
      case '3':
        this.fillDepartment(this.dtDepartmentB);
      break;
      case '4':
        this.fillDepartment(this.dtDepartmentG);
      break;
      default:
        console.log('Fuera de rango');
      break;
    }
  }*/

  toast(numberbool: any) {
    switch (numberbool) {
      case 1:
        this.showSuccess();
      break;
      case 2:
        this.showError();
      break;
      case 3:
        this.showInfo();
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

  showInfo() {
    this.toastr.overlayContainer = this.toastContainer;
    this.toastr.info('El producto esta el pedidos que no han sido procesados', 'Alerta', {
      timeOut: 4000,
      progressBar: true
    });
  }

  showError() {
    this.toastr.overlayContainer = this.toastContainer;
    this.toastr.error('Ha ocurrido un problema, por favor revise todos los datos o el peso de las imagenes',
    'Error', {
      timeOut: 4000,
      progressBar: true
    });
  }

  /*addPhotoProductList() {
    for (let i = 0; i < this.productView.length; ++i) {
      // agrego formato a la imagen.
      this.productView[i].photo = this.imgUrl.url + this.productView[i].photo;
      const photoView = this.productView[i].photo;
      // this.getDepartmentView(this.productView[i].gender.toString());
      for (let index = 0; index < this.gender.length; index++) {
        if (this.productView[i].gender.toString() === this.gender[index].id) {
          this.productView[i].gender = this.gender[index].gender;
        }
      }
      for (let indexD = 0; indexD < this.department.length; indexD++) {
        if (this.productView[i].department.toString() === this.department[indexD].id) {
          this.productView[i].department = this.department[indexD].name;
        }
      }
    }
  }*/

  addPhotoProductList() {
    for (let i = 0; i < this.productView.length; ++i) {
      // agrego formato a la imagen.
      this.productView[i].photo = this.imgUrl.url + this.productView[i].photo;
    }
  }

  getGenderToProduct(genderId, indexFor) {
    this.genderDptService.showGender(genderId).subscribe(
      response => {
        if (response.gender != null) {
          this.productView[indexFor].gender = response.gender.gender;
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getDepartmentToProduct(departmentId, indexFor) {
    this.genderDptService.showDepartment(departmentId).subscribe(
      response => {
        if (response.department != null) {
          this.productView[indexFor].department = response.department.department;
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }


  /*getProductView() {
    this.loading = true;
    this.productService.getProduct().subscribe(
      response => {
        if (response.status === 'success') {
          this.productView = response.articles;
          console.log(this.productView);
          this.statusBool = true;
          this.addPhotoProductList();
          this.loading = false;
        } else {
          this.productView = response.articles;
          this.statusBool = false;
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }*/

  getProductView() {
    this.loading = true;
    this.productService.getProduct().subscribe(
      response => {
        if (response.status === 'success') {
          this.dataFromProductList = response.articles;
          this.urlPaginate = response.articles.next_page_url;
          this.productView = response.articles.data;
          this.totalPage = response.articles.total;
          this.statusBool = true;
          this.addPhotoProductList();
          this.loading = false;
        } else {
          this.productView = response.articles;
          this.statusBool = false;
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }

  nextPaginate(event: any) {
    this.p = event;
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
        console.log(<any> error);
      }
    );
  }

  gotoEdit(id: any) {
    this.router.navigate(['/editarProducto', id]);
  }

  gotoPanel() {
    this.router.navigate(['/admin']);
  }

  deleteProductView(id: any) {
    this.productRelation = [];
    this.imagesService.deleteArrayImg(id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
    this.sizeService.detachSizeProduct(id).subscribe(
      response => {
        console.log(response);
        if (response.mgs !== 'Prenda en carritos') {
          this.getProductView();
        } else {
          this.toast(3);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getTags() {
    this.productService.getAllTag().subscribe(
      response => {
        this.tags = response.tag;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  over(idProduct: any) {
    this.loading = true;
    this.productService.showPhotoProduct(idProduct).subscribe(
      response => {
        this.loading = false;
        this.viewPhoto = response.productPhoto;
        this.viewPhoto = this.imgUrl.url + this.viewPhoto;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  authAdminService(identity) {
    if (identity == null) {
      this.router.navigate(['LoginAdmin']);
    } else {
      this.adminService.authAdmin(identity).subscribe(
        response => {
          if (response.status !== 'admin') {
            this.router.navigate(['LoginAdmin']);
          } else {
            return true;
          }
        }, error => {
          console.log(<any> error);
        }
      );
    }
  }

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
          console.log(<any> error);
        }
      ); 
    }
  }

  ngOnInit() {
    if (this.identity == null) {
      this.router.navigate(['LoginAdmin']);
    } else {
      this.adminService.authAdmin(this.identity).subscribe(
        response => {
          if (response.status !== 'admin') {
            this.router.navigate(['LoginAdmin']);
          }
        }, error => {
          console.log(<any> error);
        }
      );
      // this.getGender();
      this.getGenderApi();
      this.getProductView();
      this.getTags();
      this.fileBlob = '../assets/img/default.jpg';
    }
  }

}

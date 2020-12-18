import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgxImageCompressService} from 'ngx-image-compress';

//services
import { ArticleService } from '../services/article.service';
import { ImageService } from '../services/image.service';
import { AdminService } from '../services/admin.service';

//models
import { Article } from '../models/article';
import { Size } from '../models/size';
import { Image } from '../models/image'
import { Attachsize } from '../models/attachsize';
import { Departament } from '../models/department';
import { Gender } from '../models/gender';
import { ImgUrl } from '../models/imgUrl';
import { SizeService } from '../services/size.service';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-editproduct',
  providers: [ArticleService, AdminService, ImageService],
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  public id: number;
  public product: Article;
  public genderLabel = 'Género';
  public dtpLabel = 'Departamento';
  public brandLabel = 'Marcas';
  public size: Size;
  public img: Image;
  public imgUrl = ImgUrl;
  public loading = false;
  public attachSizeProduct: Attachsize;
  public attachNewProduct: Attachsize;
  public attachSizeArray: Array<Attachsize>;
  public productView: Array<Article>;
  public producTest;
  public productViewU: Article;
  public productRelation: Attachsize[] = [];
  public fileLength;
  public suma;
  public Mprice;
  public searchProduct;
  public department: Departament[];
  public dtDepartmentM: string[] = [
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
  'Sueters',
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
  'Sueters'
];
  public gender: Gender[];
  public dataGender: string[] = ['Hombre', 'Mujer', 'Niño', 'Niña'];
  public status: string;
  public statusBool: boolean;
  public justNumber: number;
  public justString: string;
  public fileNpm: Array<Image>;
  public fileData: File;
  public fileView = [];
  public fileImg;
  public fileBlob;
  public warningSize = false;
  public warningAmount = false;
  public sizeResponse;
  public productRespose;
  public sizeSelect;
  public viewRelation;
  public token;
  public identity;
  public checkBool = false;
  public tags: any;
  public imgResultBeforeCompress: string;
  public imgResultAfterCompress: string;
  public sizeBeforeCompress;
  public sizeAfterCompress;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sizeService: SizeService,
    private adminService: AdminService,
    private imageService: ImageService,
    private imageCompress: NgxImageCompressService,
    private productService: ArticleService) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
    this.size = new Size('', 0);
    this.img = new Image('', '', null);
    this.attachSizeProduct = new Attachsize('', '', [], 0);
    this.attachNewProduct = new Attachsize('', '', [], 0);
    this.product = new Article('', '', '', 0, 0, 0, 0, '', null, '', 0, '', 0, 0, '');
  }

  //===========================================GET_METHODSs_FOR_PRODUCT==========================================================
  
  getProductServer() {
    this.productService.getProductU(this.id).subscribe(
      response => {
        this.product = response.articles;
        this.genderLabel = this.product.gender;
        this.replaceGenderNameProduct(this.genderLabel);
        this.replaceTagNameProduct();
        const product_id = response.articles.id;
        this.getImageArray(product_id);
        // this.product.photo = 'data:image/jpeg;base64,' + this.product.photo;
        this.product.photo =  this.imgUrl.url + this.product.photo;
        this.fileBlob = this.product.photo;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getImageArray(product_id) {
    this.imageService.showImgId(product_id).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      response => {
        this.fileNpm = response;
        this.fileLength = this.fileNpm.length;
        for (let i = 0; i < this.fileNpm.length; ++i) {
          // agrego formato a la imagen.
          this.fileNpm[i].name = this.imgUrl.url + this.fileNpm[i].name;
          this.fileData = new File([this.fileNpm[i].name], 'file_name', {lastModified: 1534584790000});
          this.fileView.push(this.fileData);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getGender() {
    let idGender: number;
    this.gender = [];
    for (let i = 0; i < this.dataGender.length; ++i) {
      idGender = i + 1;
      this.gender.push(new Gender(idGender.toString(), this.dataGender[i]));
    }
  }

  replaceGenderNameProduct(gender) {
    let idGender: number;
    for (let i = 0; i < this.dataGender.length; ++i) {
      idGender = i + 1;
      if (gender == idGender) {
        this.genderLabel = this.dataGender[i];
        this.getDepartment();
      }
    }
  }

  replaceDtpNameProduct(dpt, data) {
    let idDpt: number;
    for (let i = 0; i < data.length; ++i) {
      idDpt = i + 1;
      if (dpt == idDpt) {
        this.dtpLabel = data[i];
      }
    }
  }

  replaceTagNameProduct() {
    //this.brandLabel = dataTag.name;
    this.productService.getAllTag().subscribe(
      response => {
        this.tags = response.tag;
        for (let index = 0; index < this.tags.length; index++) {
          if (this.product.tags_id == this.tags[index].id) {
            this.brandLabel = this.tags[index].name;
          }
        }
      }, error => {
        console.log(<any> error);
      }
    );

    /*for (let index = 0; index < this.tags.length; index++) {
      if (this.product.tags_id == this.tags.id[index]) {
        console.log(this.tags);
      }
      
    }*/
  }

  getDepartment() {
    if (this.product.gender !== '') {
      switch (this.product.gender.toString()) {
        case '1':
          this.fillDepartment(this.dtDepartmentM);
          this.replaceDtpNameProduct(this.product.department, this.dtDepartmentM);
        break;

        case '2':
          this.fillDepartment(this.dtDepartmentW);
          this.replaceDtpNameProduct(this.product.department, this.dtDepartmentW);
        break;

        case '3':
          this.fillDepartment(this.dtDepartmentB);
          this.replaceDtpNameProduct(this.product.department, this.dtDepartmentB);
        break;

        case '4':
          this.fillDepartment(this.dtDepartmentG);
          this.replaceDtpNameProduct(this.product.department, this.dtDepartmentG);
        break;

        default:
          console.log('Fuera de rango');
        break;
      }
    } else {
      console.log('errosh');
    }
  }

  fillDepartment(data= []) {
    let dptId: number;
    this.department = [];
    for (let i = 0; i < data.length; ++i) {
      dptId = i + 1;
      this.department.push(new Departament(dptId.toString(), data[i]));
    }
  }

  pushDepart(departmentParam: any) {
    this.dtpLabel = departmentParam.name
    if (departmentParam.id !== undefined) {
      this.product.department = departmentParam.id.toString();
    }
  }

  pushGender(genderParam: any) {
    this.genderLabel = genderParam.name;
    if (genderParam.id !== undefined) {
      this.product.gender = genderParam.id.toString();
      this.getDepartment();
    }
  }

  pushTag(dataTag: any) {
    this.brandLabel = dataTag.name;
    if (dataTag.id !== undefined) {
      this.product.tags_id = dataTag.id.toString();
    }
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

  getAttachSize() {
    this.loading = true;
    this.sizeService.getSizeE(this.id).subscribe(
      response => {
        this.loading = false;
        this.productViewU = response.products;
        this.attachSizeProduct = response;
        this.viewRelation = this.productViewU[0].sizes;
        console.log(this.viewRelation);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  updateRelationSizeProduct(relation: any) {
    for (let index = 0; index < this.viewRelation.length; index++) {
      if (relation.size === this.viewRelation[index].size) {
        this.viewRelation[index].pivot.stock = relation.pivot.stock;
      }
    }
    this.sizeService.updateSizeAmountProduct(this.token, this.id, relation).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(<any> error);
      }
    );
  }

  deleteRelation(array) {
    this.sizeService.detachRelation(array.pivot).subscribe(
      response => {
        this.getAttachSize();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  //==============================================EDIT==============================================================
  editProductFunc(editProduct) {

  }
  //=================================================IMAGES====================================================

  getFileBlob(file) {
    const reader = new FileReader();
    return new Promise(function(resolve, reject) {
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
      console.log(myImg);
      this.imgResultBeforeCompress = image;
      this.sizeBeforeCompress = this.formatBytes(this.imageCompress.byteCount(image));
      let sizesFile = this.sizeBeforeCompress.split(' ');
      let typeFile = sizesFile[1];
      sizesFile = sizesFile[0];
      if (typeFile === 'MB') {
        document.getElementById("openModalButton").click();
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
    this.imageCompress.compressFile(image, orientation, 75, 50).then(
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
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }

  onUpload(e) {
    const myImg = e.target.files[0];
    this.product.photo = myImg.name;
    const promise = this.getFileBlob(myImg);
    promise.then(Blob => {
      this.fileBlob = Blob;
    });
  }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getTags();
    this.getProductServer();
    this.getAttachSize();
    this.getGender();
  }

}

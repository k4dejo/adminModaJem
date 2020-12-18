import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../services/admin.service';
import { ApartService } from '../services/apart.service';
import { CommonServices } from '../services/commons.services';

import { AttachApart } from '../models/attachApart';
import { Billing } from '../models/billing';
import { Client } from '../models/client';

@Component({
    selector: 'ngbd-modal-content',
    providers: [AdminService, ApartService, CommonServices],
    templateUrl: './modalClient.component.html',
    styleUrls: ['./apart.component.scss']
  })
  
  export class NgbdModalContent implements OnInit {
    public clients: Array<Client>;
    public pClient = 1;
    public client: Client;
    public billing: Billing;
    public clientBool;
    public splite;
    public apartM;
    public identity;
    public token;
    public idCleanApart: string;
    public attachApart: AttachApart;
  
  
    constructor(private router: Router, 
      public activeModal: NgbActiveModal,
      private adminService: AdminService,
      private commonService: CommonServices,
      private apartService: ApartService) {
        this.token = this.adminService.getToken();
        this.identity = this.adminService.getIdentity();
    }
  
    getClientList() {
      this.adminService.getClientList().subscribe(
        response => {
          this.clients = response.clients;
        }, error => {
          console.log(<any> error);
        }
      );
    }
  
    public selectClient(dataClient: any) {
      this.client = dataClient;
      this.commonService.sendOneClient(this.client);
      /*this.client.name = dataClient.name;
      this.client.address = dataClient.address;
      this.client.phone = dataClient.phone;
      this.client.email = dataClient.email;
      this.client.addressDetail = dataClient.addressDetail;
      
      this.billing.client = this.client.name;
      this.billing.email = dataClient.email;
      this.billing.address = dataClient.address;
      this.billing.addressDetail = dataClient.addressDetail;
      this.billing.phone = dataClient.phone;
      this.billing.status = 'process';
      this.apartM.clients_id = dataClient.id;
      this.apartM.price = 0;
      this.clientBool = false;
      this.splite = this.client.address.split(',');
      //this.viewAddress(this.splite[0] , this.splite[1]);
      this.adminService.authAdmin(this.identity).subscribe(
        response => {
          if (response.status !== 'admin') {
            this.router.navigate(['LoginAdmin']);
          } else {
            this.apartM.admin_id = this.identity.sub;
            //this.addNewApartService(this.token, this.apartM, dataClient.id);
          }
        }, error => {
          console.log(<any> error);
        }
      );*/
    }
  
    
    addNewApartService(token, apartM, clientId) {
      this.apartService.addNewApart(token, apartM).subscribe(
        response => {
          if (response.status === 'success' || response.status === 'Exist') {
            this.attachApart.apart_id = response.apart.id;
            //this.getApartClient(clientId);
            this.idCleanApart = response.apart.id;
          }
        }, error => {
          console.log(<any> error);
        }
      );
    }
  
    ngOnInit(): void {
      this.getClientList();
      this.commonService.sendClientObservables.subscribe(
        response => {
          this.client = response;
          console.log(this.client)
        }
      );
    }
  }
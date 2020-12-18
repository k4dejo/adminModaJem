import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Admin } from '../models/admin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public token;
  public identity;
  public admin: Admin;
  public loading = false;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService) {
      this.token = this.adminService.getToken();
      this.identity = this.adminService.getIdentity();
      this.admin = new Admin('', '');
  }

  Onsubmit(form: any) {
    this.loading = true;
    this.adminService.signup(this.admin).subscribe(
      response => {
        if (response.status !== 'Error') {
          // token del usuario
          this.token = response;
          localStorage.setItem('token', this.token);
          // objeto usuario identificado
          this.adminService.signup(this.admin, true).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
              if (response.status !== 'Error') {
                this.identity = response;
                localStorage.setItem('identity', JSON.stringify(this.identity));
                if (this.token !== 'undefined') {
                  if (this.admin.user === this.identity.user) {
                    this.status = 'success';
                    this.loading = false;
                    this.router.navigate(['dashboard']);
                  } else {
                    this.status = 'error';
                  }
                } else {
                  this.status = 'error';
                  this.loading = false;
                }
              }
            },
            error => {
              console.log(<any>error);
              this.loading = false;
              this.status = 'error';
            }
          );
        }
        if (response.status === 'Error') {
          this.loading = false;
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.loading = false;
        this.status = 'error';
      }
    );
  }

  ngOnInit(): void {
  }

}

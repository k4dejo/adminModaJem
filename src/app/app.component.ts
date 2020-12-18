import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AdminService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-modajem';
  public token;
  public identity;
  
  constructor( private router: Router, private route: ActivatedRoute, private adminService: AdminService) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
  }
  ngOnInit() {
    console.log(this.identity);
    if (this.identity == null) {
      this.router.navigate(['login']);
    }
    this.adminService.authAdmin(this.identity).subscribe(
      response => {

        if (response.status !== 'admin') {
          this.router.navigate(['login']);
          console.log(response);
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }
}

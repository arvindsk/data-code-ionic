import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MessageService],
})
export class LoginComponent implements OnInit {


  @Input() userName:any;
  @Input() password:any;
  public errorMessage : any;
  constructor( private route: ActivatedRoute,
               private router: Router) {
  }

  ngOnInit(): void {

  }
  login(): void {
    //this.authService.login();
    if(true) {
      void this.router.navigate(['adapt/home']);
    }
  }


}


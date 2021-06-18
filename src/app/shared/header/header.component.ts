import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginComponent} from "../../login/login.component";
import {EmitService} from "../../services/emit.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[MessageService],
})
export class HeaderComponent implements OnInit {

  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  fname : string;
  loggedIn : boolean;
  private sub;
  mainmenu: string;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private emitSvc : EmitService) {
     }

  ngOnInit(): void {
    this.fname = '';
    this.loggedIn = false;
    this.sub = this.emitSvc.subscribeToServiceEmitter ( this, this.onEmittedEvent );
  }

  onEmittedEvent ( obj, data ) {
    obj.fname = data;
    obj.loggedIn = true;
  }

  onSegmentChanged(ev: any) {
    if(ev.detail.value == 'summary') {
      this.mainmenu = "summary";
      void this.router.navigate(['adapt/summary']);
    }
    if(ev.detail.value == 'collect-data'){
      this.mainmenu = "collect-data";
      void this.router.navigate(['adapt/collect-data']);
    }
  }

}


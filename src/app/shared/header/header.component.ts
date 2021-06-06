import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[MessageService],
})
export class HeaderComponent implements OnInit {


  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public baseLine: any[];
  public columnHeader: any[];
  public tableValues : any[];
  @ViewChild('dt') table: Table;
  userId = "Test";

  constructor(  private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {


  }

  onSegmentChanged(ev: any) {
    if(ev.detail.value == 'summary') {
      void this.router.navigate(['adapt/summary']);
      //this.isWelcome = false;
      //this.isSummary = true;
      //this.isCollectData = false;
    }
    if(ev.detail.value == 'collect-data'){
     // this.isWelcome = false;
      //this.isSummary = false;
      //this.isCollectData = true;
      void this.router.navigate(['adapt/collect-data']);
    }
  }

}


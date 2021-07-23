import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {MatTableDataSource} from "@angular/material/table";
import {SummaryMap} from "../../model/SummaryMap";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../services/data-storage.service";
import {AdaptService} from "../../services/adapt.service";
import {Summary} from "../../model/Summary";
import {BreakpointObserver} from "@angular/cdk/layout";



@Component({
  selector: 'app-thirdyear-summary',
  templateUrl: './thirdyear-summary.component.html',
  styleUrls: ['./thirdyear-summary.component.scss'],
  providers:[MessageService],
})
export class ThirdyearSummaryComponent implements OnInit {

  @Input() site: string;
  sitename: string;
  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public baseLine: any[];
  public columnHeader: any[];
  public tableValues : any[];
  @ViewChild('dt') table: Table;
  public headerCount;
  isMobile=false;
  dataSource = new MatTableDataSource<SummaryMap>([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['studyName', 'participantStudyCount'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private adaptService: AdaptService,
              private breakpointObserver: BreakpointObserver,) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      if(result.matches ){
        this.isMobile=true;
      }
      this.displayedColumns = result.matches ?
        ['studyName', 'participantStudyCount'] :
        ['studyName', 'participantStudyCount'];
    });
  }

  ngOnInit(): void {

    this.site = localStorage.getItem("site");
    this.sitename = localStorage.getItem("sitename");

    this.columnHeader=[
      {field:'questionnaire', header :'Questionnaire'},
      {field:'noOfParticipants', header :'Number Of Participants'},
    ];
     /*this.tableValues=[
       {field:'vascularRisk', header:'Vascular Risk', value:'43'},
       {field:'cardioVascularRisk', header:'Cardio Vascular Risk', value:'34'},
       {field:'memory', header:'Memory', value:'24'},
       {field:'diet', header:'Diet', value:'15'},
       {field:'exercise', header:"Exercise", value:'12' },
     ]*/
    this.loadSummary();

  }

  loadSummary() {
    this.adaptService.getSummary(this.site).subscribe((data: Summary) => {
      if (data) {
        this.headerCount=data.participantCount;
        this.tableValues = data.thirdyearStudySummary;
        this.dataSource.data = data.thirdyearStudySummary;
      }
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  onTabOpen(event: any): void {
    this.tabOpened.emit(event.index);
  }

  onTabClose(event: any): void {
    this.tabClosed.emit(event.index);
  }

}


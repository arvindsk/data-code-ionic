import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {ParticipantStudy} from "../../model/ParticipantStudy";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../services/data-storage.service";
import {AdaptService} from "../../services/adapt.service";
import {Summary} from "../../model/Summary";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SummaryMap} from "../../model/SummaryMap";



@Component({
  selector: 'app-baseline-summary',
  templateUrl: './baseline-summary.component.html',
  styleUrls: ['./baseline-summary.component.scss'],
  providers:[MessageService],
})
export class BaselineSummaryComponent implements OnInit {


  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public baseLine: any[];
  public columnHeader: any[];
  @ViewChild('dt') table: Table;
  public tableValues;
  public headerCount;
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
    private adaptService: AdaptService) { }

  ngOnInit(): void {

   /* this.columnHeader=[
      {field:'questionnaire', header :'Questionnaire'},
      {field:'noOfParticipants', header :'Number Of Participants'},
    ]
    this.tableValues=[
      {field:'vascularRisk', header:'Vascular Risk', value:'43'},
      {field:'cardioVascularRisk', header:'Cardio Vascular Risk', value:'34'},
      {field:'memory', header:'Memory', value:'24'},
      {field:'diet', header:'Diet', value:'15'},
      {field:'exercise', header:"Exercise", value:'12' },
    ]*/
    this.loadSummary();
  }

  loadSummary() {
    this.adaptService.getSummary().subscribe((data: Summary) => {
      if (data) {
       this.headerCount=data.participantCount;
        this.tableValues = data.baselineStudySummary;
        this.dataSource.data = data.baselineStudySummary;
      }
    });
  }

  onTabOpen(event: any): void {
    this.tabOpened.emit(event.index);
  }

  onTabClose(event: any): void {
    this.tabClosed.emit(event.index);
  }

}


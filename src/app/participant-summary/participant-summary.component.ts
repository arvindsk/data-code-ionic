import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-participant-summary',
  templateUrl: './participant-summary.component.html',
  styleUrls: ['./participant-summary.component.scss'],
  providers:[MessageService],
})
export class ParticipantSummaryComponent implements OnInit {


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

    this.columnHeader=[
      {field:'questionnaire', header :'Questionnaire'},
      {field:'status', header :'Status'},
      {field:'start', header :'View/Begin'},
      {field:'completedDate', header :'Completed Date'},
    ]
    this.tableValues=[
      {field:'vascularRisk', header:'Vascular Risk', value:'Not Started'},
      {field:'cardioVascularRisk', header:'Cardio Vascular Risk', value:'Not Started'},
      {field:'memory', header:'Memory', value:'Not Started'},
      {field:'diet', header:'Diet', value:'Not Started'},
      {field:'exercise', header:"Exercise", value:'Not Started' },
    ]

  }

  onSegmentChanged(ev: any) {
    void this.router.navigate(['adapt/home']);
  }

  public summary(): void {
    void this.router.navigate(['home']);
  }

  public collect(): void {
    void this.router.navigate(['home']);
  }

  onTabOpen(event: any): void {
    this.tabOpened.emit(event.index);
  }

  onTabClose(event: any): void {
    this.tabClosed.emit(event.index);
  }

}


import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";



@Component({
  selector: 'app-thirdyear-summary',
  templateUrl: './thirdyear-summary.component.html',
  styleUrls: ['./thirdyear-summary.component.scss'],
  providers:[MessageService],
})
export class ThirdyearSummaryComponent implements OnInit {


  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public baseLine: any[];
  public columnHeader: any[];
  public tableValues : any[];
  @ViewChild('dt') table: Table;

  constructor() { }

  ngOnInit(): void {

    this.columnHeader=[
      {field:'questionnaire', header :'Questionnaire'},
      {field:'noOfParticipants', header :'Number Of Participants'},
    ]
    this.tableValues=[
      {field:'vascularRisk', header:'Vascular Risk', value:'43'},
      {field:'cardioVascularRisk', header:'Cardio Vascular Risk', value:'34'},
      {field:'memory', header:'Memory', value:'24'},
      {field:'diet', header:'Diet', value:'15'},
      {field:'exercise', header:"Exercise", value:'12' },
    ]


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


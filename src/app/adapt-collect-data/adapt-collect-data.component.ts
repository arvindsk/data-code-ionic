import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";



@Component({
  selector: 'app-adapt-collect-data',
  templateUrl: './adapt-collect-data.component.html',
  styleUrls: ['./adapt-collect-data.component.scss'],
  providers:[MessageService],
})
export class AdaptCollectDataComponent implements OnInit {


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
      {field:'participantId', header :'Participant ID'},
      {field:'firstName', header :'First Name'},
      {field:'lastName', header :'Last Name'},
      {field:'dob', header :'DOB'},
      {field:'registeredDate', header :'Registered Date'},
      {field:'timeline', header :'Timeline'},
      {field:'questionnaireCompleted', header :'Questionnaire Completed'},
    ]
    this.tableValues=[
      {field:'participantId', value1:'143443', value2:'Tony', value3:'Spark', value4:'05.03.1998', value5:'03.02.2021', value6:'Baseline', value7:'Vascular'},
      {field:'participantId', value1:'363443', value2:'Allen', value3:'Wilkinson', value4:'05.04.1998', value5:'03.03.2021', value6:'1st Year', value7:'Memory'},
      {field:'participantId', value1:'723443', value2:'Karl', value3:'Smith', value4:'05.06.1998', value5:'03.04.2021', value6:'3rd Year', value7:'Diet'},

    ]


  }
  onTabOpen(event: any): void {
    this.tabOpened.emit(event.index);
  }

  onTabClose(event: any): void {
    this.tabClosed.emit(event.index);
  }

}


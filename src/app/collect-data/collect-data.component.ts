import {Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {DataStorageService} from "../services/data-storage.service";
import {Router} from "@angular/router";
import {AdaptService} from "../services/adapt.service";
import {Participant} from "../model/Participant";


@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.scss'],
  providers: [MessageService],
})
export class CollectDataComponent implements OnInit {


  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public baseLine: any[];
  public columnHeader: any[];
  public tableValues: any[];
  @ViewChild('dt') table: Table;

  public flyout = false;

  constructor(private router: Router, private dataStorageService: DataStorageService, private adaptService: AdaptService) {
  }

  ngOnInit(): void {

    this.columnHeader = [
      {field: 'participantId', header: 'Participant ID'},
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'dob', header: 'DOB'},
      {field: 'registeredDate', header: 'Registered Date'},
      {field: 'timeline', header: 'Timeline'},
      {field: 'questionnaireCompleted', header: 'Questionnaire Completed'},
    ];
    /*this.tableValues = [
      {
        participantId: '143443',
        firstName: 'Tony',
        lastName: 'Stark',
        dob: '05.03.1998',
        registeredDate: '03.02.2021',
        timeline: 'Baseline',
        questionnaireCompleted: 'Vascular'
      },
      {
        participantId: '363443',
        firstName: 'Allen',
        lastName: 'Wilkinson',
        dob: '05.04.1998',
        registeredDate: '03.03.2021',
        timeline: '1st Year',
        questionnaireCompleted: 'Memory'
      },
      {
        participantId: '723443',
        firstName: 'Karl',
        lastName: 'Smith',
        dob: '05.06.1998',
        registeredDate: '03.04.2021',
        timeline: '3rd Year',
        questionnaireCompleted: 'Diet'
      },

    ];*/

    this.loadParticipants();


  }

  loadParticipants() {
    this.adaptService.getParticipants().subscribe((data: Participant[]) => {
      if (data) {
        this.tableValues = data;
      }
    });
  }

  onTabOpen(event: any): void {
    this.tabOpened.emit(event.index);
  }

  onTabClose(event: any): void {
    this.tabClosed.emit(event.index);
  }

  search() {

  }

  public onTab(participantObj: any) {
    console.log(participantObj);
    this.dataStorageService.storage = {
      participant: JSON.stringify(participantObj)
    };
    //this.router.navigate(['adapt/participant']);
  }
}


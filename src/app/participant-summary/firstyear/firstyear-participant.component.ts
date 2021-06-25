import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {Participant} from "../../model/Participant";
import {DataStorageService} from "../../services/data-storage.service";
import {AdaptService} from "../../services/adapt.service";
import {ParticipantStudy} from "../../model/ParticipantStudy";
import {BreakpointObserver} from "@angular/cdk/layout";



@Component({
  selector: 'app-firstyear-participant',
  templateUrl: './firstyear-participant.component.html',
  styleUrls: ['./firstyear-participant.component.scss'],
  providers:[MessageService],
})
export class FirstyearParticipantComponent implements OnInit {
  displayedColumns: string[] = ['studyName', 'status','view', 'completedDate'];
  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public baseLine: any[];
  public columnHeader: any[];
  public tableValues: any[];
  public participant: Participant;
  @ViewChild('dt') table: Table;
  userId = "Test";
  public headerName;
  public headerId;
  isMobile=false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private breakpointObserver: BreakpointObserver,
              private adaptService: AdaptService) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      if(result.matches ){
        this.isMobile=true;
      }
      this.displayedColumns = result.matches ?
        ['studyName', 'status', 'start', 'completedDate'] :
        ['studyName', 'status', 'start', 'completedDate'];
    });
  }

  ngOnInit(): void {
    this.participant = this.dataStorageService.storage.participant;

    this.columnHeader = [
      {field: 'studyName', header: 'Questionnaire'},
      {field: 'status', header: 'Status'},
      {field: 'start', header: 'View/Begin'},
      {field: 'completedDate', header: 'Completed Date'},
    ];
    this.loadParticipantStudyList();
    /*    this.tableValues = [
          {field: 'vascularRisk', header: 'Vascular Risk', value: 'Not Started'},
          {field: 'cardioVascularRisk', header: 'Cardio Vascular Risk', value: 'Not Started'},
          {field: 'memory', header: 'Memory', value: 'Not Started'},
          {field: 'diet', header: 'Diet', value: 'Not Started'},
          {field: 'exercise', header: "Exercise", value: 'Not Started'},
        ]*/

  }

  loadParticipantStudyList() {
    this.adaptService.loadParticipantStudyList(this.participant).subscribe((data: ParticipantStudy[]) => {
      if (data) {
        this.headerName=this.participant.firstName;
        this.headerId=this.participant.participantId;
        this.tableValues = data;
      }
    });
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

  onTab(data: any) {
    console.log(data);
    this.dataStorageService.storage = {
      participantStudy: data
    };

  }
}


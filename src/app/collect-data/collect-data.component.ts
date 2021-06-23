import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {DataStorageService} from "../services/data-storage.service";
import {Router} from "@angular/router";
import {AdaptService} from "../services/adapt.service";
import {Participant} from "../model/Participant";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.scss'],
  providers: [MessageService],
})
export class CollectDataComponent implements OnInit, AfterViewInit {


  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public isFiltered: boolean;
  public columnHeader: any[];
  public tableValues: Participant[];
  dataSource = new MatTableDataSource<Participant>([]);
  @ViewChild('dt') table: Table;
  displayedColumns: string[] = ['participantId', 'firstName', 'lastName', 'dob', 'registeredDate', 'timeline', 'completedDate'];
  public flyout = false;
  isMobile=false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public searchForm: FormGroup;

  constructor(private router: Router,
              private dataStorageService: DataStorageService,
              private adaptService: AdaptService,
              private breakpointObserver: BreakpointObserver,
              private fb: FormBuilder) {
    this.searchForm = this.fb.group({participantId: new FormControl('', [
      ]), firstname: new FormControl('', [
      ]), lastname: new FormControl('', [
      ]), dob: new FormControl('', [
      ])});
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      if(result.matches ){
        this.isMobile=true;
      }
      this.displayedColumns = result.matches ?
        ['participantId', 'firstName', 'lastName', 'dob', 'registeredDate', 'timeline', 'completedDate'] :
        ['participantId', 'firstName', 'lastName', 'dob', 'registeredDate', 'timeline', 'completedDate'];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.columnHeader = [
      {field: 'participantId', header: 'Participant ID'},
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'dob', header: 'DOB'},
      {field: 'registeredDate', header: 'Registered Date'},
      {field: 'timeline', header: 'Timeline'},
      {field: 'completedDate', header: 'Completed Date'},
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

    this.loadParticipants("init");
    this.isFiltered = false;
  }

  loadParticipants(source:string) {
    if(source === 'clear'){
      if(this.isFiltered){
        this.isFiltered = false;
      }else{
        return;
      }
    }
    this.adaptService.getParticipants().subscribe((data: Participant[]) => {
      if (data) {
        this.tableValues = data;
        this.dataSource.data = data;
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
    this.tableValues = this.tableValues.filter(function filterObj(element, index, array) {
      let flag: boolean ;
      if(this.searchForm.value.participantId != ''){
        if(element.participantId == this.searchForm.value.participantId) {
          flag = true;
        }else {
          flag = false;
        }
      }
      if(this.searchForm.value.firstname != ''){
        if(element.firstName == this.searchForm.value.firstname){
          flag = true;
        }else {
          flag = false;
        }
      }
      if(this.searchForm.value.lastname != ''){
        if(element.lastName == this.searchForm.value.lastname){
          flag = true;
        }else {
          flag = false;
        }
      }
      if(this.searchForm.value.dob != ''){
        if(element.dob == this.searchForm.value.dob){
          flag = true;
        }else {
          flag = false;
        }
      }
      return flag;
    }, this);
    this.dataSource.data = this.tableValues;
    this.isFiltered = true;
  }
  
  public onTab(participantObj: any) {
    this.dataStorageService.storage = {
      participant: participantObj
    };
    //this.router.navigate(['adapt/participant']);
  }
}


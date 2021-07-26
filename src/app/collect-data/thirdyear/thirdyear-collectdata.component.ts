import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {DataStorageService} from "../../services/data-storage.service";
import {Router} from "@angular/router";
import {AdaptService} from "../../services/adapt.service";
import {Participant} from "../../model/Participant";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-collect-data',
  templateUrl: './thirdyear-collectdata.component.html',
  styleUrls: ['./thirdyear-collectdata.component.scss'],
  providers: [MessageService],
})
export class ThirdyearCollectDataComponent implements OnInit, AfterViewInit {

  @Input() site: string;
  sitename: string;
  naccId: string;
  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  public isFiltered: boolean;
  public columnHeader: any[];
  public tableValues: Participant[];
  dataSource = new MatTableDataSource<Participant>([]);
  @ViewChild('dt') table: Table;
  displayedColumns: string[] = ['participantId', 'firstName', 'lastName', 'dob', 'registeredDate', 'thirdyearStatus'];
  public flyout = false;
  isMobile=false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public searchForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private dataStorageService: DataStorageService,
              private adaptService: AdaptService,
              private breakpointObserver: BreakpointObserver,
              private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      participantId: new FormControl('', []),
      firstname: new FormControl('', []),
      lastname: new FormControl('', []),
      dob: new FormControl('', [])
    });
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      if(result.matches ){
        this.isMobile=true;
      }else {
        this.isMobile = false;
      }
      this.displayedColumns = result.matches ?
        ['participantId', 'firstName', 'lastName', 'dob', 'registeredDate', 'thirdyearStatus'] :
        ['participantId', 'firstName', 'lastName', 'dob', 'registeredDate', 'thirdyearStatus'];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.site = localStorage.getItem("site");
    this.sitename = localStorage.getItem("sitename");
    this.naccId = localStorage.getItem("naccId");

    this.columnHeader = [
      {field: 'participantId', header: 'Participant ID'},
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'dob', header: 'DOB'},
      {field: 'registeredDate', header: 'Registered Date'},
      {field: 'completedDate', header: 'Completed Date'},
    ];

    this.loadParticipants("init");
    this.isFiltered = false;
    this.errorMessage = "";
  }

  loadParticipants(source:string) {
    if(source === 'clear'){
      if(this.isFiltered){
        this.isFiltered = false;
      }else{
        return;
      }
      this.reset();
    }
    this.adaptService.getParticipants(this.naccId).subscribe((data: Participant[]) => {
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

  reset(){
    this.searchForm.reset();
    this.errorMessage = "";
  }

  search() {
    this.errorMessage = '';
    this.tableValues = this.tableValues.filter(function filterObj(element, index, array) {
      let flag: boolean;
      if (this.searchForm.value.participantId != null && this.searchForm.value.participantId != '') {
        if (element.participantId == this.searchForm.value.participantId) {
          flag = true;
        } else {
          flag = false;
        }
      }else {
        if (this.searchForm.value.firstname != null && this.searchForm.value.firstname != '') {
          if (element.firstName.toUpperCase().indexOf(this.searchForm.value.firstname.toString().toUpperCase()) >= 0) {
            flag = true;
            if (this.searchForm.value.lastname != null && this.searchForm.value.lastname != '') {
              if (element.lastName.toUpperCase().indexOf(this.searchForm.value.lastname.toString().toUpperCase()) >= 0) {
                flag = true;
                if (this.searchForm.value.dob != null && this.searchForm.value.dob != '') {
                  if (element.dob == this.searchForm.value.dob) {
                    flag = true;
                  } else {
                    flag = false;
                  }
                }
              } else {
                flag = false;
              }
            }
          } else {
            flag = false;
          }
        }else if (this.searchForm.value.lastname != null && this.searchForm.value.lastname != '') {
          if (element.lastName.toUpperCase().indexOf(this.searchForm.value.lastname.toString().toUpperCase()) >= 0) {
            flag = true;
            if (this.searchForm.value.dob != null && this.searchForm.value.dob != '') {
              if (element.dob == this.searchForm.value.dob) {
                flag = true;
              } else {
                flag = false;
              }
            }
          } else {
            flag = false;
          }
        }else{
          if (this.searchForm.value.dob != null && this.searchForm.value.dob != '') {
            if (element.dob == this.searchForm.value.dob) {
              flag = true;
            } else {
              flag = false;
            }
          }
        }
      }
      return flag;
    }, this);
    this.dataSource.data = this.tableValues;
    if (this.tableValues.length === 0) {
      this.errorMessage = '!!No records found!!';
    }
    this.isFiltered = true;
  }

  public onTab(participantObj: any) {
    this.dataStorageService.storage = {
      participant: participantObj
    };
    //this.router.navigate(['adapt/participant']);
  }
}


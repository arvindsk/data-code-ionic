import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {DataStorageService} from "../../services/data-storage.service";
import {Participant} from "../../model/Participant";
import {AdaptService} from "../../services/adapt.service";
import {ParticipantStudy} from "../../model/ParticipantStudy";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateStatusModel} from "../../model/update-status.model";
import {AuthService} from "../../services/auth.service";
import {EmitService} from "../../services/emit.service";
import {FormBuilder, FormGroup,Validators} from "@angular/forms";

interface Access
{
  name: string;
  code: string;
}

@Component({
  selector: 'app-thirdyear-participant',
  templateUrl: './thirdyear-participant.component.html',
  styleUrls: ['./thirdyear-participant.component.scss'],
  providers: [ConfirmationService,MessageService],
})
export class ThirdyearParticipantComponent implements OnInit {
  displayedColumns: string[] = ['studyName', 'status', 'view', 'completedDate'];
  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  closeResult = '';
  public baseLine: any[];
  public columnHeader: any[];
  public tableValues: ParticipantStudy[];
  public participant: Participant;
  @ViewChild('dt') table: Table;
  userId = 'Test';
  public headerName;
  public headerId;
  isMobile = false;
  acccessMode: Access[];
  public flyout = false;
  participantEmail:string;
  registerForm: FormGroup;
  submitted = false;
  participantStudy:ParticipantStudy;
  loadingData=false;
  value = 0;
  resendClicked=false;
  editEmailbuttonClicked=false;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private breakpointObserver: BreakpointObserver,
              private adaptService: AdaptService,
              private modal: NgbModal,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authService: AuthService,
              private _emitSvc: EmitService,
              private formBuilder: FormBuilder) {
    this.acccessMode = [
      {name: 'Onsite by Coordinator', code: 'coordinator'},
      {name: 'Onsite by Participant', code: 'participant'},
      {name: 'Email Participant', code: 'email'}
    ];

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      }
      this.displayedColumns = result.matches ?
        ['studyName', 'access', 'status', 'start', 'completedDate'] :
        ['studyName', 'access', 'status', 'start', 'completedDate'];
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
    if (undefined !== this.dataStorageService.storage) {
      this.participant = this.dataStorageService.storage.participant;
      this.emailControl?.setValue(this.participant.email);
    }


    this.columnHeader = [
      {field: 'studyName', header: 'Questionnaire'},
      {field: 'access', header: 'Access'},
      {field: 'status', header: 'Status'},
      {field: 'start', header: 'Begin/Continue/View'},
      {field: 'completedDate', header: 'Completed Date'},
    ];

    // console.log(JSON.stringify(this.participant));
    this.activatedRoute.queryParams.subscribe(params => {
      const participantId = params.participantId;
      if (undefined !== participantId && null !== participantId) {
        this.participant = new Participant();
        this.participant.participantId = participantId;
        this.participant.timeline = 'Thirdyear';
        this.loadParticipantStudyList();
      } else {
        if (undefined !== this.dataStorageService.storage) {
          this.participant = this.dataStorageService.storage.participant;
        }

        if (undefined !== this.participant) {
          this.participant.timeline = 'Thirdyear';
          this.loadParticipantStudyList();
        }
      }
    });


    /*    this.tableValues = [
          {field: 'vascularRisk', header: 'Vascular Risk', value: 'Not Started'},
          {field: 'cardioVascularRisk', header: 'Cardio Vascular Risk', value: 'Not Started'},
          {field: 'memory', header: 'Memory', value: 'Not Started'},
          {field: 'diet', header: 'Diet', value: 'Not Started'},
          {field: 'exercise', header: "Exercise", value: 'Not Started'},
        ]*/

  }

  loadParticipantStudyList() {

    this.dataStorageService.storage = {
      participant: this.participant
    };

    this.adaptService.loadParticipantStudyList(this.participant).subscribe((data: ParticipantStudy[]) => {
      if (data) {
        this.emailControl?.setValue(data[0].email);
        this.headerName = data[0].firstName;
        this.headerId = this.participant.participantId;
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

  onTab(data: ParticipantStudy) {
    console.log(data);
    this.dataStorageService.storage = {
      participantStudy: data
    };
    if ('participant' === data.access) {
      this.authService.logout();
      this._emitSvc.emitThisData('loggedin:');
      const navigationExtras: NavigationExtras = {
        queryParams: {quid: data.quid}
      };
      const url = '/questionnaire';
      void this.router.navigate([url], navigationExtras);
    } else if ('email' === data.access) {
      console.log('email');
    } else {
      void this.router.navigate(['/adapt/collect-data/participant/questionnaire']);
    }

  }

  openModel() {
    this.modal.open(this.modalContent, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true})
      .result
      .then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  onDropdownValueChange(element: ParticipantStudy) {
    this.messageService.clear('baselineAccessMessage');
    console.log(element.access);
    this.adaptService.updateParticipantStudy(element).subscribe((data: UpdateStatusModel) => {
      console.log(status);
        if (data.status === 'SUCCESS') {
          console.log('updated successfully');
          this.messageService.add({
            key: 'baselineAccessMessage',
            severity: 'success',
            summary: 'Success',
            detail: 'Access updated'
          });
        }else {
          this.messageService.add({
            key: 'baselineAccessMessage',
            severity: 'error',
            summary: 'Error',
            detail: 'Error occurred while updating access field'
          });
        }
      });
  }

  onSubmitClick(element: ParticipantStudy) {

    this.messageService.clear('baselineAccessMessage');

    this.confirmationService.confirm({
      key:'thirdyesrsubmit',
      message: 'Would you like to submit the questionnaire?',
      header: 'Confirmation',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.updateSubmitStatus(element);
      },
      reject: () => {
        console.log('Cancel clicked');
      },
    });


  }

  updateSubmitStatus(element: ParticipantStudy) {
    element.status='completed';
    this.adaptService.updateParticipantStudy(element).subscribe((data: UpdateStatusModel) => {
      console.log(status);
      if (data.status === 'SUCCESS') {
        this.loadParticipantStudyList();
        localStorage.removeItem('participant');
        console.log('updated successfully');
        this.messageService.add({
          key: 'baselineAccessMessage',
          severity: 'success',
          summary: 'Success',
          detail: 'Questionnaire submitted successfully'
        });
      } else {
        this.messageService.add({
          key: 'baselineAccessMessage',
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to submit the questionnaire'
        });
      }
    });
  }

   getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.messageService.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loadingData=true;
    this.participantStudy.email=this.emailControl?.value;
    this.adaptService.sendMail(this.participantStudy).subscribe((updateStatus:UpdateStatusModel)=>{
      this.loadingData=false;
      if('SUCCESS'===updateStatus.status){
        this.flyout=false;
        this.editEmailbuttonClicked=false;
        this.resendClicked=false;
        this.loadParticipantStudyList();
        this.messageService.add({
          key: 'baselineAccessMessage',
          severity: 'success',
          summary: 'Success',
          detail: 'Questionnaire submitted successfully'
        });
      }else {
        this.editEmailbuttonClicked=false;
        this.resendClicked=false;
        this.messageService.add({
          key: 'emailMessageError',
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to send mail to the participant'
        });
      }
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  get emailControl() {
    return this.registerForm.get('email');
  }
  clearField(){
    this.registerForm.get('email').reset();
  }

  updateStudy(element: ParticipantStudy) {
    this.participantStudy = element;
  }

  resendQuestionnaire(element:ParticipantStudy) {
    this.participantStudy = element;
    this.resendClicked=true;
  }

  editEmailClicked() {
    this.editEmailbuttonClicked=true;
  }
}


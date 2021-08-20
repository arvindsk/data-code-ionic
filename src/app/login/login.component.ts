import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Injector, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AdaptService} from '../services/adapt.service';
import {LoginRequest} from '../model/LoginRequest';
import {LoginResponse} from '../model/LoginResponse';
import {EmitService} from '../services/emit.service';
import {AuthService} from '../services/auth.service';
import {DataStorageService} from '../services/data-storage.service';
import {ParticipantStudy} from '../model/ParticipantStudy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MessageService],
})
export class LoginComponent implements OnInit {

  public name: string;
  public naccId: number;
  public signInForm: FormGroup;
  site: string;
  sitename: string;
  @Output() errorMessage: any;
  constructor( private route: ActivatedRoute,
               private router: Router,
               private adaptService: AdaptService,
               private fb: FormBuilder,
               private _emitSvc: EmitService,
               private authService: AuthService,
               private dataStorageService: DataStorageService) {
    this.signInForm = this.fb.group({
      username: new FormControl('', [ Validators.required,
        Validators.pattern(/.+@.+\..+/), // any char, then the @, then any char, then ., then any char
       ]),password: new FormControl('', [
         ])
    });
  }

  ngOnInit(): void {
    this.signInForm.reset();
  }

  postData() {
    this._emitSvc.emitThisData('fname:'+this.name);
    this._emitSvc.emitThisData('site:'+this.site);
    this._emitSvc.emitThisData('sitename:'+this.sitename);
    this._emitSvc.emitThisData('naccId:'+this.naccId);
  }

  login(): void {
    if(this.signInForm.value.username===null || this.signInForm.value.password===null){
      this.errorMessage = '!!Please enter Username and Password!!';
    }else{const loginRequest: LoginRequest = new LoginRequest(this.signInForm.value.username, this.signInForm.value.password);
      if(this.authService.isAuthenticated()){
        return;
      }
      this.adaptService.login(loginRequest).subscribe((data: LoginResponse) => {
        if (data.status === 'success') {
          this.name = data.name;
          this.site = data.site;
          this.sitename = data.sitename;
          this.naccId = data.naccId;
          this.postData();
          this.authService.login(loginRequest.emailId, data.name, data.site, data.sitename, data.naccId);
          this.signInForm.reset();

          const studyItem = localStorage.getItem('participant');


          if (undefined !== this.dataStorageService.storage && this.dataStorageService.storage.participantStudy !== undefined) {
            const participantStudy: ParticipantStudy = this.dataStorageService.storage.participantStudy;
            const navigationExtras: NavigationExtras = {
              queryParams: {participantId: participantStudy.participantId}
            };
            const url = '/adapt/collect-data/participant/' + participantStudy.timeline.toLowerCase();
            void this.router.navigate([url], navigationExtras);
          } else if (studyItem !== undefined && studyItem !== null) {
            const participantStudy: ParticipantStudy = new ParticipantStudy();
            Object.assign(participantStudy , JSON.parse(studyItem));

            const navigationExtras: NavigationExtras = {
              queryParams: {participantId: participantStudy.participantId}
            };
            const url = '/adapt/collect-data/participant/' + participantStudy.timeline.toLowerCase();
            void this.router.navigate([url], navigationExtras);
          } else {
            this.router.navigate(['adapt/summary']);
          }
        } else {
          this.errorMessage = '!!Username and Password mismatch!!';
        }
      });
    }

  }


}


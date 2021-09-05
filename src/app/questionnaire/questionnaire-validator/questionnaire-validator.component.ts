import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdaptService} from '../../services/adapt.service';
import {DataStorageService} from '../../services/data-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ParticipantStudy} from '../../model/ParticipantStudy';

@Component({
  selector: 'app-questionnaire-validator',
  templateUrl: './questionnaire-validator.component.html',
  styleUrls: ['./questionnaire-validator.component.scss'],
})
export class QuestionnaireValidatorComponent implements OnInit {
  loadQuestionnaire = false;
  participantStudy: ParticipantStudy;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adaptService: AdaptService,
              private dataStorageService: DataStorageService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loadQuestionnaire = false;
    this.spinner.show();
    this.getParticipantStudy().then(() => {
      setTimeout(() => {
        this.spinner.hide();
        if ('Submitted' === this.participantStudy.status || 'Ready for Submission'=== this.participantStudy.status || this.participantStudy.timeline !== this.participantStudy.activeTimeline || this.participantStudy.endedTimeline) {
          void this.router.navigate(['expired']);
        } else {
          this.dataStorageService.storage = {
            participantStudy: this.participantStudy
          };
          void this.router.navigate(['adapt/collect-data/participant/questionnaire']);
        }
      }, 2000);

    });

  }

  public getParticipantStudy() {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe(params => {
        const quid = params.quid;
        if (undefined !== quid && null !== quid) {
          this.adaptService.getParticipantStudy(quid).subscribe((data: ParticipantStudy) => {
            this.participantStudy = data;
            resolve();
          });
        } else {
          this.participantStudy = this.dataStorageService.storage.participantStudy;
          resolve();
        }
      });
    });
  }

}

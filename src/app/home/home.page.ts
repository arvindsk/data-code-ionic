import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public userId : any;
  isWelcome: boolean = false ;
  isSummary: boolean = false ;
  isCollectData: boolean = false ;
  constructor(
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loggedInUser();
    this.isWelcome = true;
    this.isSummary = false;
    this.isCollectData = false;
  }


    onSegmentChanged(ev: any) {
      if(ev.detail.value == 'summary') {
        void this.router.navigate(['adapt/summary']);
        //this.isWelcome = false;
        //this.isSummary = true;
        //this.isCollectData = false;
      }
      if(ev.detail.value == 'collect-data'){
        //this.isWelcome = false;
        //this.isSummary = false;
        //this.isCollectData = true;
        void this.router.navigate(['adapt/collect-data']);
      }
  }

  loggedInUser(): void {
      this.userId = ["Test"];
  }

}

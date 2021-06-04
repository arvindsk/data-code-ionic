import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { HeaderColor } from '@ionic-native/header-color/ngx';

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

  public summary(): void {
    this.isWelcome = false;
    this.isSummary = true;
    this.isCollectData = false;
    //void this.router.navigate(['adapt/summary']);
  }

  public collect(): void {
    this.isWelcome = false;
    this.isSummary = false;
    this.isCollectData = true;
    //void this.router.navigate(['adapt/collectdata']);
  }

  loggedInUser(): void {
      this.userId = ["Test"];
  }

}

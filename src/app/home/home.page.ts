import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  isWelcome: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.isWelcome = true;
  }

}

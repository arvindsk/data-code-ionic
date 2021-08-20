import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitService} from '../../services/emit.service';
import {AuthService} from '../../services/auth.service';
import {ThemeService} from "../../theme/theme.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {

  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();
  fname: string;
  @Output() site : string;
  loggedIn: boolean;
  mainmenu = 'summary';
  enable: false;

  private sub;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private emitSvc: EmitService,
              private authService: AuthService,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
    if (location.pathname.indexOf("summary") >= 0 || location.pathname.indexOf("login") >= 0) {
      this.mainmenu = "summary";
    } else {
      this.mainmenu = "collect-data";
    }
    this.fname = '';
    this.site = '';
    this.loggedIn = false;
    this.sub = this.emitSvc.subscribeToServiceEmitter(this, this.onEmittedEvent);
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
      this.fname = localStorage.getItem('fname');
      this.site = localStorage.getItem('site');
    }
  }

  onEmittedEvent(obj, data) {

    if (data.includes('loggedin:')) {
      obj.loggedIn=false;
    }else{
      if (data.includes('fname:')) {
        obj.fname = data.split(':', 2)[1];
      }
      if (data.includes('site:')) {
        obj.site = data.split(':', 2)[1];
      }

      obj.loggedIn = true;
    }

  }

  onSegmentChanged(ev: any) {
    if (ev.detail.value === 'summary') {
      this.mainmenu = 'summary';
      void this.router.navigate(['adapt/summary']);
    }
    if (ev.detail.value === 'collect-data') {
      this.mainmenu = 'collect-data';
      void this.router.navigate(['adapt/collect-data']);
    }
  }

  onSegmentClicked() {
    this.mainmenu = "collect-data";
    void this.router.navigate(['adapt/collect-data']);
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  toggle(): void {
    document.body.classList.toggle('dark');
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }

}


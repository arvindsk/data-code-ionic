import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class DirectAccessGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(state.url);
    // If the previous URL was blank, then the user is directly accessing this page
    if (!this.authService.isAuthenticated()) {
      if(state.url === '/adapt/login'){
        return true;
      }else if (state.url === '/adapt/collect-data/participant/questionnaire'){
        return true;
      }else {
        this.router.navigate(['']); // Navigate away to some other page
        return false;
      }
    }
    if(state.url === '/adapt/login'){
      this.router.navigate(['/adapt/summary']);
      return false;
    }
    return true;
  }
}

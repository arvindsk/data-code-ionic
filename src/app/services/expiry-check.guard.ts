import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {AdaptService} from "./adapt.service";
import {Observable} from "rxjs";

@Injectable()
export class ExpiryCheckGuard implements CanActivate {

    // A root guard that will route users to the dashboard if in prod mode
    constructor(public router: Router, private authService: AuthService,private adaptService:AdaptService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(state.url);

      this.authService.logout();
        return true;
    }
}

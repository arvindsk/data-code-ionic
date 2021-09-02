import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AdaptService} from './adapt.service';
import {ParticipantStudy} from '../model/ParticipantStudy';

@Injectable()
export class NonAuthGuard implements CanActivate {

    // A root guard that will route users to the dashboard if in prod mode
    constructor(public router: Router, private authService: AuthService) {}

    canActivate(): boolean {
      this.authService.logout();
        return true;
    }
}

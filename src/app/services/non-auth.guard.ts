import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class NonAuthGuard implements CanActivate {

    // A root guard that will route users to the dashboard if in prod mode
    constructor(public router: Router) {}

    canActivate(): boolean {
        return true;
    }
}

import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  public isAuthenticated(): boolean {
    const idToken = localStorage.getItem('userid');

    // API will trigger 401s if the token is expired triggering the login flow.
    // We don't need duplicate logic here so this is simplified to just look for the token.
    if (!idToken) {
      return false;
    }

    return true;
  }

  public login(userid, fname, site, sitename){
    localStorage.setItem('userid', userid);
    localStorage.setItem('fname', fname);
    localStorage.setItem('site', site);
    localStorage.setItem('sitename', sitename);
  }

  public logout(){
    localStorage.clear();
  }

}

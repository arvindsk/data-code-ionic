export class LoginRequest {
  emailId: string;
  password: string;
  site: string;
  constructor(emailId: string, password: string, site: string) {
    this.emailId = emailId;
    this.password = password;
    this.site = site;
  }
}

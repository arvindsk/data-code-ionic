export class LoginRequest {
  emailId: string;
  password: string;
  constructor(emailId: string, password: string) {
    this.emailId = emailId;
    this.password = password;
  }
}

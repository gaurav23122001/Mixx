export class LoginMetadata {
  public statusCode: number = 0;
  public status: boolean = false;
  public tokenString: string = "";
  public emailId: string = "";
  public name: string = "";
  public id: number = -1;
  constructor(token: string) {
    this.tokenString = token;
  }
}

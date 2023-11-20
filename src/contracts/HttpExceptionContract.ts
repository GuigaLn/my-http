export abstract class HttpExceptionContract {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly error: string;
  
  constructor(message: string, statusCode: number, error: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}
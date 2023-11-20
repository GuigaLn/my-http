import { OutgoingHttpHeader, OutgoingHttpHeaders } from 'http';

/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class HttpSuccessContract {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly body: any;
  public readonly headers: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined;
  
  constructor(message: string, statusCode: number, body: any, headers: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined) {
    this.message = message;
    this.statusCode = statusCode;
    this.body = body;
    this.headers = headers;
  }
}
import { Request, Response } from './HttpContract';

export abstract class RouterContract {
  protected endpoint: string;
  protected method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  public handler: (request: Request, response: Response) => void;

  constructor(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', handler: (request: Request, response: Response) => void) {
    this.endpoint = endpoint;
    this.method = method;
    this.handler = handler;
  }
}

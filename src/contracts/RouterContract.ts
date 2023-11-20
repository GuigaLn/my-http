import { Request, Response } from './HttpContract';

export abstract class RouterContract {
  protected readonly endpoint: string;
  protected readonly method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  public readonly handler: (request: Request, response: Response) => void;

  constructor(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', handler: (request: Request, response: Response) => void) {
    this.endpoint = endpoint;
    this.method = method;
    this.handler = handler;
  }
}

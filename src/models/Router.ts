import { RouterContract } from '../contracts/RouterContract';
import { Request, Response } from '@src/contracts/HttpContract';

export class Router extends RouterContract {
  constructor(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', handler: (request: Request, response: Response) => void) {
    super(endpoint, method, handler);
    this.validate();
  }

  private validate() {
    if(!this.endpoint) {
      console.error('Endpoint is required', { endpoint: this.endpoint, method: this.method, handler: this.handler });
      process.exit(1);
    }
    if(!this.method || !['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].includes(this.method)) {
      console.error('Method is required');
      process.exit(1);
    }
    if(!this.handler) {
      console.error('Handler is required');
      process.exit(1);
    }
  }
}
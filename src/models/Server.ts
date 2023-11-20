import { createServer as HttpCreateServer } from 'http';

import { ServerContract } from '../contracts/ServerContract';
import { Router } from './Router';
import { Request, Response } from '@src/contracts/HttpContract';

class Server extends ServerContract {
  createServer(): void {
    if(this.http) {
      console.error('Error: This server is created.');
      process.exit(1);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http = HttpCreateServer((request: Request, response: any) => {
      try {
        const { method, url } = request;

        const findRouter = this.routes[`${url}-${method}`];
        if(findRouter) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.send = (statusCode: number, body: any) => {
            response.writeHead(statusCode, { 'Content-Type': 'JSON' });
            response.end(JSON.stringify(body));
          };

          findRouter.handler(request, response);
        } else {
          response.writeHead(404, { 'Content-Type': 'JSON' });
          response.end(JSON.stringify({ message: 'Not found' }));
        }
      } catch(error) {
        console.log(error);
        response.writeHead(200, { 'Content-Type': 'JSON' });
        response.end(JSON.stringify({ message: 'Server error' }));
      }
    });
  }

  listen(port: number, listeningListener: (() => void)): void {
    if(!this.http) {
      console.error('Error: This server not created.');
      process.exit(1);
    }

    if(!port) {
      console.error('Port is required');
      process.exit(1);
    }

    if(!listeningListener) {
      console.error('Listening Listener is required');
      process.exit(1);
    }

    this.http.on('error', (error: NodeJS.ErrnoException) => {
      switch(error.code) {
      case 'EACCES':
        console.error(error);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(error);
        process.exit(1);
        break;
      default:
        break;
      }
    });

    this.http.listen(port, listeningListener);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addRouter(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', handler: (request: Request, response: Response) => void) {
    const router = new Router(endpoint, method, handler);
    this.routes[`${endpoint}-${method}`] = router;
  }
}

const server = new Server();
export {server};

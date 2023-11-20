import { createServer as HttpCreateServer } from 'http';

import { ServerContract } from '../contracts/ServerContract';
import { Router } from './Router';
import { Request, Response } from '../contracts/HttpContract';
import { NotFoundException, ServerException } from './HttpException';
import { HttpSuccessContract } from '../contracts/HttpSuccessContract';

class Server extends ServerContract {
  public createServer(): void {
    if(this.http) {
      console.error('Error: This server has already been created.');
      process.exit(1);
    }

    this.http = HttpCreateServer((request: Request, response: any) => {
      try {
        const { method, url } = request;

        const findRouter = this.routes[`${url}-${method}`];
        if(findRouter) {
          response.send = (httpSuccess: HttpSuccessContract) => {
            response.writeHead(httpSuccess.statusCode, httpSuccess.headers);
            response.end(JSON.stringify(httpSuccess));
          };

          findRouter.handler(request, response);
          return;
        } 

        const exception = new NotFoundException();
        response.writeHead(exception.statusCode, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
          message: exception.message,
          statusCode: exception.statusCode,
          error: exception.error
        }));
        return;
      } catch(error) {
        if(this.handlingErrors) {
          this.handlingErrors(request, response, error);
          return;
        }
          
        const exception = new ServerException();
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
          message: exception.message,
          statusCode: exception.statusCode,
          error: exception.error
        }));
      }
    });
  }

  public listen(port: number, listeningListener: (() => void)): void {
    if(!this.http) {
      console.error('Error: This server has not been created.');
      process.exit(1);
    }

    if(!port) {
      console.error('Error: Port is required');
      process.exit(1);
    }

    if(!listeningListener) {
      console.error('Error: Listening Listener is required');
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

  public addRouter(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', handler: (request: Request, response: Response) => void) {
    const router = new Router(endpoint, method, handler);
    this.routes[`${endpoint}-${method}`] = router;
  } 

  public addHandlingErrors(handlingErrors: (request: Request, response: Response, error: unknown) => void) {
    if(this.handlingErrors) {
      console.error('Error: Error handling already exists.');
      process.exit(1);
    }

    this.handlingErrors = handlingErrors;
  }
}

const server = new Server();
export {server};

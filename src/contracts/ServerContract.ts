import { Server as HttpServer } from 'http';
import { RouterContract } from './RouterContract';
import { Request, Response } from './HttpContract';

interface Routes {
  [key: string]: RouterContract;
}

export abstract class ServerContract {
  protected http: HttpServer | undefined;
  protected routes: Routes = {};
  protected handlingErrors?: (request: Request, response: Response, error: any) => void = undefined;

  abstract createServer(): void;

  abstract listen(port: number, listeningListener: (() => void)): void;
}

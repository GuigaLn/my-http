import { Server as HttpServer } from 'http';
import { RouterContract } from './RouterContract';

interface Routes {
  [key: string]: RouterContract;
}

export abstract class ServerContract {
  protected http: HttpServer | undefined;
  protected routes: Routes = {};

  abstract createServer(): void;

  abstract listen(port: number, listeningListener: (() => void)): void;
}

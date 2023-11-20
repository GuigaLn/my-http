import { server } from './models/Server';
import { Request, Response } from './contracts/HttpContract';

server.createServer();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
server.addRouter('/teste', 'GET', (request: Request, response: Response) => {
  response.send(201, { request: request.headers });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
server.addRouter('/teste', 'POST', (request: Request, response: Response) => {
  throw new Error('Not implemented');
});

server.listen(3000, () => {
  console.log('🚀 Server started at http://localhost:3000');
});
import { server } from './models/Server';
import { Request, Response } from './contracts/HttpContract';
import { OkCreated, OkSuccess } from './models/HttpSuccess';
import { BadRequestException } from './models/HttpException';
import { HttpExceptionContract } from './contracts/HttpExceptionContract';

server.createServer();

server.addRouter('/', 'GET', (request: Request, response: Response) => {
  response.send(new OkSuccess('Ok', [
    { userId: '662ea78a-1ea9-40d4-9742-e08b613d8d78', name: 'User - 01' },
    { userId: '8bc7d2cf-e3ea-48be-8a97-58372371b908', name: 'User - 02' }
  ]));
});

server.addRouter('/', 'POST', (request: Request, response: Response) => {
  response.send(new OkCreated('Ok', { userId: '662ea78a-1ea9-40d4-9742-e08b613d8d78', name: 'New user' }));
});

server.addRouter('/', 'PUT', () => {
  throw new BadRequestException('Not implemented');
});

server.addHandlingErrors((request: Request, response: Response, error) => {
  if(error instanceof HttpExceptionContract) {
    console.error('HandlingErrors:', error);
    response.writeHead(error.statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      message: error.message,
      statusCode: error.statusCode,
      error: error.error
    }));
    return;
  }
});

server.listen(3000, () => {
  console.log('🚀 Server started at http://localhost:3000');
});
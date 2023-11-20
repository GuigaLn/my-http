import { HttpExceptionContract } from '../contracts/HttpExceptionContract';

class BadRequestException extends HttpExceptionContract {
  constructor(message = 'Bad Request Exception') {
    super(message, 400, '400 - Bad Request Exception');
  }
}
  
class UnauthorizedException extends HttpExceptionContract {
  constructor(message = 'Unauthorized Exception') {
    super(message, 401, '401 - Unauthorized Exception');
  }
}
  
class ForbiddenException extends HttpExceptionContract {
  constructor(message = 'Forbidden Exception') {
    super(message, 403, '403 - Forbidden Exception');
  }
}
  
class NotFoundException extends HttpExceptionContract {
  constructor(message = 'Not Found Exception') {
    super(message, 404, '404 - Not Found Exception');
  }
}
  
class ConflictException extends HttpExceptionContract {
  constructor(message = 'Conflict Exception') {
    super(message, 409, '409 - Conflict Exception');
  }
}
  
class ServerException extends HttpExceptionContract {
  constructor(message = 'Server Exception') {
    super(message, 500, '500 - Server Exception');
  }
}

export { 
  BadRequestException, 
  UnauthorizedException, 
  ForbiddenException, 
  NotFoundException, 
  ConflictException, 
  ServerException 
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OutgoingHttpHeader, OutgoingHttpHeaders } from 'http';
import { HttpSuccessContract } from '../contracts/HttpSuccessContract';

class OkSuccess extends HttpSuccessContract {
  constructor(message = 'Success', body: any, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined) {
    super(message, 200, body, headers);
  }
}

class OkCreated extends HttpSuccessContract {
  constructor(message = 'Created', body: any, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined) {
    super(message, 201, body, headers);
  }
}

export { OkSuccess, OkCreated };
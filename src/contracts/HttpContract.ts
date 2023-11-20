import { IncomingMessage, ServerResponse} from 'http';
import { HttpSuccessContract } from './HttpSuccessContract';

interface Request extends IncomingMessage {}

interface Response extends ServerResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (httpSuccess: HttpSuccessContract) => void;
}


export { Request, Response };
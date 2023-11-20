import { IncomingMessage, ServerResponse} from 'http';

interface Request extends IncomingMessage {}

interface Response extends ServerResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (statusCode: number, body: any) => void;
}

export { Request, Response };
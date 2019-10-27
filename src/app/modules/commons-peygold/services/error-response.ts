/**
 * ErrorResponse model
 */
import {Response} from './response';

export class ErrorResponse extends Response {
  protected type = Response.TYPE_ERROR;
}

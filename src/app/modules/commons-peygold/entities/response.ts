/**
 * Response model
 */
export class Response {

  static TYPE_ERROR = 'error';

  /**
   * Response from the any API request.
   * @param message response message
   * @param code response code
   */
  constructor(
    public message: string,
    public code: number,
    public ok?: boolean,
  ) { }
}

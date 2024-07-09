import { CustomError } from './CustomError';

export class NotAuthorized extends CustomError {
  statusCode = 401;

  status = "Unauthorized";

  constructor() {
    super();

    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  serializeError() {
    return [{ message: "Not Authorized, Please signin" }];
  }
}

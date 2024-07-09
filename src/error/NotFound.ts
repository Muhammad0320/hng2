import { CustomError } from './CustomError';

export class NotFound extends CustomError {
         statusCode = 404;

         status = "NotFound";

         constructor(public message: string) {
           super();

           Object.setPrototypeOf(this, NotFound.prototype);
         }

         serializeError() {
           return [{ message: this.message }];
         }
       }

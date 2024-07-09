import { CustomError } from './CustomError';

export class BadRequest extends CustomError {
         statusCode = 400;

         status = "Bad Request";

         constructor(public message: string) {
           super();

           Object.setPrototypeOf(this, BadRequest.prototype);
         }

         serializeError() {
           return [{ message: this.message }];
         }
       }

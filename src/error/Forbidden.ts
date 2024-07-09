import { CustomError } from "./CustomError";

export class Forbidden extends CustomError {
         statusCode = 403;

         status = "Forbidden";

         constructor(public message: string) {
           super();

           Object.setPrototypeOf(this, Forbidden.prototype);
         }

         serializeError() {
           return [{ message: this.message }];
         }
       }

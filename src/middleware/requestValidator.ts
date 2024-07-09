import { NextFunction, Request } from "express";
import { validationResult } from "express-validator";
import { RequestValidation } from "../error/RequestValidation";

export const requestValidator = (req: Request, _: any, next: NextFunction) => {
  const errors = validationResult(req);

  console.log(errors, "The errors sent back");

  if (!errors.isEmpty()) {
    throw new RequestValidation(errors.array());
  }

  next();
};

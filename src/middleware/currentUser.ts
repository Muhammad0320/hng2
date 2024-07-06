import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


interface UserPayload {
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: number;
    passwordConfirm: string;
  };

  iat: Date;
  exp: Date;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload["user"];
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();

  const user = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as unknown;

  const decoded = user as UserPayload;

  req.currentUser = decoded.user;

  next();
};

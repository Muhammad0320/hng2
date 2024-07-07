import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequest } from "../../error/BadRequest";
import User from "../../model/User";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    passwordConfirm,
  } = req.body;

  const existinguser = await User.findOne({ email });

  if (!!existinguser) {
    throw new BadRequest("Registration Unsuccessful");
  }

  if (!process.env.JWT_EXPIRES_IN) throw new Error(" Jwt timestamp not found ");

  if (!process.env.JWT_SECRET) throw new Error(" Jwt secret not found ");

  const newUSer = await User.buildUser({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    phone,
  });

  const jwtToken = jwt.sign(newUSer, process.env.JWT_SECRET, {
    expiresIn: +process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
  });

  res.status(201).json({
    status: "success",
    message: "Registration Successful",
    data: {
      accessToken: jwtToken,
      user: newUSer,
    },
  });
});

export { router as registerUserRouter };

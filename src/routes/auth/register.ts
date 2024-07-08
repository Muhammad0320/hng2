import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequest } from "../../error/BadRequest";
import User from "../../model/User";
import { requestValidator } from "../../middleware/requestValidator";
import {
  emailValidator,
  nameValidator,
  passwordConfirmValidator,
  passwordValidator,
  phoneValidator,
} from "../../services/validators";
import Org from "../../model/Organisation";

const router = express.Router();

router.post(
  "/register",
  [
    nameValidator("firstName"),
    nameValidator("lastname"),
    emailValidator(),
    passwordValidator(),
    passwordConfirmValidator(),
    phoneValidator(),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
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

    const newUSer = await User.buildUser({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      phone,
    });

    if (!process.env.JWT_EXPIRES_IN)
      throw new Error(" Jwt timestamp not found ");

    if (!process.env.JWT_SECRET) throw new Error(" Jwt secret not found ");

    const accessToken = jwt.sign(newUSer, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
    });

    req.session = {
      jwt: accessToken,
    };

    res.status(201).json({
      status: "success",
      message: "Registration Successful",
      data: {
        accessToken,
        user: newUSer,
      },
    });
  };
);

export { router as registerUserRouter };

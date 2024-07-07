import express, { Request, Response } from "express";
import { emailValidator, passwordValidator } from "../../services/validators";
import { requestValidator } from "../../middleware/requestValidator";
import User from "../../model/User";

import { CryptoManager } from "../../services/Crypto";
import jwt from "jsonwebtoken";
import { BadRequest } from "../../error/BadRequest";

const router = express.Router();

router.post(
  "/login",
  [emailValidator(), passwordValidator()],
  requestValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select("+password");

    if (!!!existingUser) throw new BadRequest("Authentication failed");

    if (!(await CryptoManager.compare(existingUser.password, password)))
      throw new BadRequest("Authentication failed");

    if (!process.env.JWT_EXPIRES_IN)
      throw new Error(" Jwt timestamp not found ");

    if (!process.env.JWT_SECRET) throw new Error(" Jwt secret not found ");

    const accessToken = jwt.sign(existingUser, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",

      data: {
        accessToken,
        user: existingUser,
      },
    });
  }
);

export { router as loginRouter };

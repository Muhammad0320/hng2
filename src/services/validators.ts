import { check } from "express-validator";
import mongoose from "mongoose";

export const emailValidator = () =>
  check("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Please provide a valid email format ");

export const passwordValidator = () =>
  check("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Please provide a valid password format");

export const passwordConfirmValidator = () =>
         check("passwordConfirm")
           .trim()
           .notEmpty()
           .custom((input: string, { req }) => input === req.body.password)
           .withMessage("Passwords does not match");

export const phoneValidator = () =>
  check("phone")
    .isInt()
    .notEmpty()
    .isMobilePhone("en-NG")
    .withMessage("Please provide nigerian mobile phone no");

export const nameValidator = (field: string) =>
         check(field)
           .trim()
           .notEmpty()
           .withMessage("Please provide a valid name");

export const idValidator = () =>
  check("userId")
    .isString()
    .trim()
    .notEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage("Provide a valid mongoose id");
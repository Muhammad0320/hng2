import { check } from "express-validator";

export const emailValidator = check("email")
  .trim()
  .isEmail()
  .withMessage("Please provide a valid email format ");

export const passwordValidator = check("password")
  .trim()
  .notEmpty()
  .isLength({ min: 8 })
  .withMessage("Please provide a valid password format");

export const passwordConfirmValidator = check("password")
  .trim()
  .notEmpty()
  .custom((input: string, { req }) => input === req.body.password)
  .withMessage("Passwords does not match");

export const phoneValidator = check("phone")
  .isInt()
  .isMobilePhone("en-NG")
  .withMessage("Please provide nigerian mobile phone no");

export const firstNameValidator = (field: string) =>
  check(field)
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Please provide a valid name");

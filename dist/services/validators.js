"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidator = exports.nameValidator = exports.phoneValidator = exports.passwordConfirmValidator = exports.passwordValidator = exports.emailValidator = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const emailValidator = () => (0, express_validator_1.check)("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email format ");
exports.emailValidator = emailValidator;
const passwordValidator = () => (0, express_validator_1.check)("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Please provide a valid password format");
exports.passwordValidator = passwordValidator;
const passwordConfirmValidator = () => (0, express_validator_1.check)("password")
    .trim()
    .notEmpty()
    .custom((input, { req }) => input === req.body.password)
    .withMessage("Passwords does not match");
exports.passwordConfirmValidator = passwordConfirmValidator;
const phoneValidator = () => (0, express_validator_1.check)("phone")
    .isInt()
    .isMobilePhone("en-NG")
    .withMessage("Please provide nigerian mobile phone no");
exports.phoneValidator = phoneValidator;
const nameValidator = (field) => (0, express_validator_1.check)(field)
    .trim()
    .notEmpty()
    .withMessage("Please provide a valid name");
exports.nameValidator = nameValidator;
const idValidator = () => (0, express_validator_1.check)("userId")
    .isString()
    .trim()
    .notEmpty()
    .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input))
    .withMessage("Provide a valid mongoose id");
exports.idValidator = idValidator;

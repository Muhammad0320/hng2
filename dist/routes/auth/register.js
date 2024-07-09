"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BadRequest_1 = require("../../error/BadRequest");
const requestValidator_1 = require("../../middleware/requestValidator");
const User_1 = __importDefault(require("../../model/User"));
const validators_1 = require("../../services/validators");
const router = express_1.default.Router();
exports.registerUserRouter = router;
router.post("/register", [
    (0, validators_1.nameValidator)("firstName"),
    (0, validators_1.nameValidator)("lastName"),
    (0, validators_1.emailValidator)(),
    (0, validators_1.passwordValidator)(),
    (0, validators_1.passwordConfirmValidator)(),
    (0, validators_1.phoneValidator)(),
], requestValidator_1.requestValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, phone, passwordConfirm, } = req.body;
    const existinguser = yield User_1.default.findOne({ email });
    if (!!existinguser) {
        throw new BadRequest_1.BadRequest("Registration Unsuccessful");
    }
    const newUSer = yield User_1.default.buildUser({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        phone,
    });
    if (!process.env.JWT_EXPIRES_IN)
        throw new Error(" Jwt timestamp not found ");
    if (!process.env.JWT_SECRET)
        throw new Error(" Jwt secret not found ");
    const accessToken = jsonwebtoken_1.default.sign({ user: newUSer }, process.env.JWT_SECRET, {
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
}));

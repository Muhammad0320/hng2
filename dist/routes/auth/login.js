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
exports.loginRouter = void 0;
const express_1 = __importDefault(require("express"));
const validators_1 = require("../../services/validators");
const requestValidator_1 = require("../../middleware/requestValidator");
const User_1 = __importDefault(require("../../model/User"));
const Crypto_1 = require("../../services/Crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BadRequest_1 = require("../../error/BadRequest");
const router = express_1.default.Router();
exports.loginRouter = router;
router.post("/login", [(0, validators_1.emailValidator)(), (0, validators_1.passwordValidator)()], requestValidator_1.requestValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield User_1.default.findOne({ email }).select("+password");
    if (!!!existingUser)
        throw new BadRequest_1.BadRequest("Authentication failed");
    if (!(yield Crypto_1.CryptoManager.compare(existingUser.password, password)))
        throw new BadRequest_1.BadRequest("Authentication failed");
    if (!process.env.JWT_EXPIRES_IN)
        throw new Error(" Jwt timestamp not found ");
    if (!process.env.JWT_SECRET)
        throw new Error(" Jwt secret not found ");
    const accessToken = jsonwebtoken_1.default.sign(existingUser, process.env.JWT_SECRET, {
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
}));

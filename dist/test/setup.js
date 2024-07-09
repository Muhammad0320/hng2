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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongo;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_SECRET = "my-super-long-and-ultra-secured-jwt-secret-key";
    process.env.JWT_EXPIRES_IN = "24";
    mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = yield mongo.getUri();
    yield mongoose_1.default.connect(mongoUri);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield mongoose_1.default.connection.db.collections();
    for (const collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo) {
        yield mongo.stop();
    }
    yield mongoose_1.default.connection.close();
}));
global.signin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = id || new mongoose_1.default.Types.ObjectId().toHexString();
    const payload = {
        userId,
        firstName: "Muhammad",
        lastName: "Balogun",
        email: "lisanalgaib@gamil.com",
        password: "shitpassword",
        phone: +2349166537641,
        passwordConfirm: "shitpassword",
    };
    // create a jwt
    if (!process.env.JWT_SECRET)
        throw new Error("");
    if (!process.env.JWT_EXPIRES_IN)
        throw new Error("");
    const token = jsonwebtoken_1.default.sign({ user: payload }, process.env.JWT_SECRET, {
        expiresIn: +process.env.JWT_EXPIRES_IN * 60 * 60,
    });
    // Build a session obj { jwt: MY_JWT }
    const sessionObj = { jwt: token };
    // Turn the session obj into json string
    const sessionJSon = JSON.stringify(sessionObj);
    // Encode the json as base 64
    const base64 = Buffer.from(sessionJSon).toString("base64");
    // returns a string and that's the cookie with encoded data
    return [`session=${base64}`];
});

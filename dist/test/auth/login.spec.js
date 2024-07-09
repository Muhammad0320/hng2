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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const builder_1 = require("../builder");
it("returns an error other than 404 if route exists", () => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode } = yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "shitemail", password: "shitPassword" });
    expect(statusCode).not.toEqual(404);
}));
it("returns a 400 on invalid email format ", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "shitmail", password: "shitpassword" })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ password: "shitpassword" })
        .expect(400);
}));
it("returns a 400 on invalid password forrmat", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "shitmail@gmail.com", password: "shit" })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "shitmail@gmail.com" })
        .expect(400);
}));
it("returns a 400 for incorrect credentials ", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "shitmail@gmail.com", password: "shitpassword" })
        .expect(400);
}));
it("returns a 200 when everything is valid", () => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = yield (0, builder_1.userBuilder)();
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email, password: "shitPassword" })
        .expect(200);
}));
it("stores and saves a cookie on valid auth", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = yield (0, builder_1.userBuilder)();
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email, password: "shitPassword" })
        .expect(200);
    expect((_a = response.get("Set-Cookie")) === null || _a === void 0 ? void 0 : _a.at(0)).toBeDefined();
}));

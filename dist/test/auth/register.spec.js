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
const Organisation_1 = __importDefault(require("../../model/Organisation"));
it("returns a 400 for invalid inputs", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail",
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail@gmail.com",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail@gmail.com",
        password: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail@gmail.com",
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail@gmail.com",
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 23491665376,
    })
        .expect(400);
}));
it("returns a 400 if email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, builder_1.userBuilder)();
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: user.email,
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(400);
}));
it("returns a 200 on valid input", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail@gmail.com",
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(201);
}));
it("creates an org off of the user", () => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { data: { user }, }, } = yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail@gmail.com",
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(201);
    const org = yield Organisation_1.default.findOne({ users: user.id });
    expect(org).toBeDefined();
}));
it("stores an acess token", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({
        email: "shitmail@gmail.com",
        password: "shitPassword",
        passwordConfirm: "shitPassword",
        firstName: "paul",
        lastName: "lisanAlgaib",
        phone: 2349166537641,
    })
        .expect(201);
    expect((_a = response.get("Set-Cookie")) === null || _a === void 0 ? void 0 : _a.at(0)).toBeDefined();
}));

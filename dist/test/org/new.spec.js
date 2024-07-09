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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const builder_1 = require("../builder");
it("returns a 401 for unauth request", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post(`/api/organisations`)
        .send()
        .expect(401);
}));
it("returns a 400, for invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post(`/api/organisations`)
        .set("Cookie", yield global.signin())
        .send({ name: "Muhammad org" })
        .expect(400);
    yield (0, supertest_1.default)(app_1.default)
        .post(`/api/organisations`)
        .set("Cookie", yield global.signin())
        .send({ description: "Muhammad org description" })
        .expect(400);
}));
it("returns a 400 if org name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, builder_1.userBuilder)();
    const org = yield (0, builder_1.orgBuilder)(user.id);
    yield (0, supertest_1.default)(app_1.default)
        .post(`/api/organisations`)
        .set("Cookie", yield global.signin())
        .send({ name: org.name })
        .expect(400);
}));
it("returns a 200 when everything is valid", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post(`/api/organisations`)
        .set("Cookie", yield global.signin())
        .send({ name: "Ahmad org" })
        .expect(400);
}));

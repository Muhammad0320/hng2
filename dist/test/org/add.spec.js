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
const mongoose_1 = __importDefault(require("mongoose"));
const builder_1 = require("../builder");
it("returns a 401 for unauthenticated user", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/organisations/shitid/users")
        .send()
        .expect(401);
}));
it("returns a 400 for invalid mongoose id", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.default)
        .post("/api/organisations/shitid/users")
        .set("Cookie", yield global.signin())
        .send()
        .expect(400);
}));
it("returns a 404 for valid but umatched userId", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.default.Types.ObjectId().toHexString();
    const user = yield (0, builder_1.userBuilder)();
    yield (0, supertest_1.default)(app_1.default)
        .post(`/api/organisations/${id}/users`)
        .set("Cookie", yield global.signin())
        .send({ userId: user.id })
        .expect(404);
}));
it("returns a 200 when e/thing is valid", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, builder_1.userBuilder)();
    const org = yield (0, builder_1.orgBuilder)(user.id);
    yield (0, supertest_1.default)(app_1.default)
        .post(`/api/organisations/${org.id}/users`)
        .set("Cookie", yield global.signin())
        .send({ userId: user.id })
        .expect(200);
}));

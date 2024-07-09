"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orgBuilder = exports.userBuilder = void 0;
const Organisation_1 = __importDefault(require("../model/Organisation"));
const User_1 = __importDefault(require("../model/User"));
const userBuilder = (id) => User_1.default.buildUser({
    email: "shitmail@gmail.com",
    firstName: "Muhammad",
    lastName: "Balogun",
    password: "shitPassword",
    passwordConfirm: "shitPassword",
    phone: 2349166537641,
});
exports.userBuilder = userBuilder;
const orgBuilder = (userId) => Organisation_1.default.buildOrg({
    userId: userId,
    name: "Muhmaads org",
    description: "This is muhammads org",
});
exports.orgBuilder = orgBuilder;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const register_1 = require("./routes/auth/register");
const login_1 = require("./routes/auth/login");
const NotFound_1 = require("./error/NotFound");
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const show_1 = require("./routes/auth/show");
const all_1 = require("./routes/org/all");
const show_2 = require("./routes/org/show");
const new_1 = require("./routes/org/new");
const add_1 = require("./routes/org/add");
const currentUser_1 = require("./middleware/currentUser");
const app = (0, express_1.default)();
app.set("trust proxy", true);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({
    httpOnly: true,
    signed: false,
    secure: false,
}));
let rootUrl = "/api/auth";
app.get("/api", (req, res) => {
    res.send("Welcome!!!!!");
});
app.use(rootUrl, register_1.registerUserRouter);
app.use(rootUrl, login_1.loginRouter);
app.use(show_1.showRouter);
rootUrl = "/api/organisations";
app.use(currentUser_1.currentUser);
app.use(rootUrl, all_1.allOrgRouter);
app.use(rootUrl, show_2.showOrgRouter);
app.use(rootUrl, new_1.newOrgRouter);
app.use(rootUrl, add_1.addNewUserToOrg);
app.all("*", () => {
    throw new NotFound_1.NotFound("Route not found");
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;

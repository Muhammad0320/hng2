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
exports.showRouter = void 0;
const express_1 = __importDefault(require("express"));
const BadRequest_1 = require("../../error/BadRequest");
const currentUser_1 = require("../../middleware/currentUser");
const paramsChecker_1 = require("../../middleware/paramsChecker");
const User_1 = __importDefault(require("../../model/User"));
const requireAuth_1 = require("../../middleware/requireAuth");
const router = express_1.default.Router();
exports.showRouter = router;
router.get("/api/users/:id", currentUser_1.currentUser, requireAuth_1.requireAuth, (0, paramsChecker_1.paramsChecker)("id"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id);
    if (!user)
        throw new BadRequest_1.BadRequest("User not found");
    res.status(200).json({
        status: "suceess",
        message: "Load data",
        data: {
            user,
        },
    });
}));

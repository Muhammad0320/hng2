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
exports.allOrgRouter = void 0;
const express_1 = __importDefault(require("express"));
const requireAuth_1 = require("../../middleware/requireAuth");
const Organisation_1 = __importDefault(require("../../model/Organisation"));
const currentUser_1 = require("../../middleware/currentUser");
const router = express_1.default.Router();
exports.allOrgRouter = router;
router.get("/", currentUser_1.currentUser, requireAuth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alluserOrg = yield Organisation_1.default.find({ userId: req.currentUser.userId });
    res.status(200).json({
        status: "success",
        message: "Load data",
        data: {
            orgs: alluserOrg,
        },
    });
}));

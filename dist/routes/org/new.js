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
exports.newOrgRouter = void 0;
const express_1 = __importDefault(require("express"));
const BadRequest_1 = require("../../error/BadRequest");
const requestValidator_1 = require("../../middleware/requestValidator");
const requireAuth_1 = require("../../middleware/requireAuth");
const Organisation_1 = __importDefault(require("../../model/Organisation"));
const validators_1 = require("../../services/validators");
const router = express_1.default.Router();
exports.newOrgRouter = router;
router.post("/", requireAuth_1.requireAuth, [(0, validators_1.nameValidator)("name"), (0, validators_1.nameValidator)("description")], requestValidator_1.requestValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const existingOrg = yield Organisation_1.default.findOne({ name });
    if (!!existingOrg)
        throw new BadRequest_1.BadRequest("Client error");
    const newOrg = yield Organisation_1.default.buildOrg({
        description,
        name,
        userId: req.currentUser.userId,
    });
    res.status(200).json({
        status: "success",
        message: "Org creation successful",
        data: newOrg,
    });
}));

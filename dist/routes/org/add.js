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
exports.addNewUserToOrg = void 0;
const express_1 = __importDefault(require("express"));
const NotFound_1 = require("../../error/NotFound");
const paramsChecker_1 = require("../../middleware/paramsChecker");
const requestValidator_1 = require("../../middleware/requestValidator");
const requireAuth_1 = require("../../middleware/requireAuth");
const Organisation_1 = __importDefault(require("../../model/Organisation"));
const validators_1 = require("../../services/validators");
const router = express_1.default.Router();
exports.addNewUserToOrg = router;
router.post("/:id/users", requireAuth_1.requireAuth, (0, paramsChecker_1.paramsChecker)("id"), [(0, validators_1.idValidator)()], requestValidator_1.requestValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const org = yield Organisation_1.default.findById(req.params.id);
    if (!org)
        throw new NotFound_1.NotFound("Org not found");
    yield org.updateOne({ users: [...org.users, req.body.userId] });
    res.status(200).json({
        status: "success",
        message: "user addded to organization succesfully",
    });
}));

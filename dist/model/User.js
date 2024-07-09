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
const mongoose_1 = __importDefault(require("mongoose"));
const Crypto_1 = require("../services/Crypto");
const Organisation_1 = __importDefault(require("./Organisation"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (value) {
                return this.password === value;
            },
            message: "Passwords are not the same",
        },
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
    },
    organisation: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Org",
        },
    ],
}, {
    toJSON: {
        transform(doc, ret) {
            ret.userId = ret._id;
            delete ret._id;
        },
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            this.passwordConfirm = undefined;
            this.password = (yield Crypto_1.CryptoManager.hash(this.password));
        }
        next();
    });
});
userSchema.statics.buildUser = function (attrs) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.create(attrs);
        const org = yield Organisation_1.default.buildOrg({
            userId: user._id,
            description: `${user.firstName}'s newly created organization`,
            name: `${user.firstName}'s org`,
        });
        console.log(org, "New organisation");
        yield user.updateOne({
            organisation: [org._id],
        });
        const updateduser = yield User.findById(user._id);
        return updateduser;
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;

"use strict";
// mongodb+srv://muhammad0320:muhammawwal@005@atlascluster.x1qxlkc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
if (!process.env.MONGO_URI)
    throw new Error(" Mongo uri not found ");
if (!process.env.PORT)
    throw new Error(" port uri not found ");
const port = process.env.PORT || 8000;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connection successful"));
app_1.default.listen(port, () => {
    console.log("App running on port " + port);
});

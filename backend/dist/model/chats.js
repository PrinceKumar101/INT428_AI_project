"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.chatsSchema = new mongoose_1.default.Schema({
    id: {
        type: mongoose_1.default.Schema.ObjectId,
    },
    role: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
});

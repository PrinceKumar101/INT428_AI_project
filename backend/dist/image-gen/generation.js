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
exports.run = void 0;
const node_fetch_1 = __importDefault(require("node-fetch")); // Required for fetch in Node.js
const API_URL = "https://api.cloudflare.com/client/v4/accounts/750250527aa24e3c4d35a9a1a523ae86/ai/run";
const run = (model, prompt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)(`${API_URL}/${model}`, {
            headers: {
                Authorization: "Bearer TD3Qi9bT5bue5E3kOrs7qIbXeHC-5yAQsgLNYw_f",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ prompt }),
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const result = yield response.json();
        return result;
    }
    catch (error) {
        console.error("Error calling AI API:", error);
        return { error: "Failed to fetch AI response" };
    }
});
exports.run = run;

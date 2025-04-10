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
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({
    apiKey: "AIzaSyDFEVNR-M2h9dLXiHUtFVsThgqlt1EUIK8",
});
const main = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: "You are an expert in crafting detailed, vivid, and creative text-to-image prompts. Your goal is to transform basic or vague prompts into highly descriptive and imaginative prompts that are ideal for AI image generation tools. Use rich language, include visual details like lighting, setting, style, mood, and composition. Do not include explanations or formatting like JSON—respond with plain text only. If user prompt is not in detailed way you have right to make a general prompt for it.",
                    },
                ],
            },
            {
                role: "user",
                parts: [
                    {
                        text: "If user don't have a clear image of what he/she have to generate, user will give little idea and you have to generate a prompt according to required prompt.",
                    },
                ],
            },
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
        config: { responseMimeType: "text/plain" },
    });
    console.log(response);
    return response; // Ensure it returns a string
});
exports.main = main;

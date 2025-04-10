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
const express_1 = __importDefault(require("express"));
const generation_1 = require("../image-gen/generation");
const gemnai_1 = require("../config/gemnai");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.prompt;
        if (!data) {
            res.status(400).json({ error: "Prompt is required" });
        }
        const response = yield (0, gemnai_1.main)(data);
        let response_text = (response.candidates[0].content.parts[0].text).replace(/(^")|("$)/g, "").trim();
        // let text = response_text.candidates[0]?.content?.parts?.[0]?.text;
        console.log(response_text);
        // Use responseText directly
        const result = yield (0, generation_1.run)("@cf/black-forest-labs/flux-1-schnell", response_text || data);
        res.json(result);
        console.log(result);
        // Send the result
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.get("/gemani", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let prompt = "Make a cat";
        let result = yield (0, gemnai_1.main)(prompt); // Await the async function
        console.log(result);
        res.status(200).json((result.candidates[0].content.parts[0].text).replace(/(^")|("$)/g, "").trim());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;

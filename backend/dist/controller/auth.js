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
exports.login_function = exports.signup_function = void 0;
const users_1 = __importDefault(require("../model/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function encrypt_password(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        return hash;
    });
}
const signup_function = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(204).json({ message: "User inputs found empty." });
        }
        const user = yield users_1.default.findOne({ email });
        if (user) {
            console.log("User already exists.");
            return res.status(409).json({ message: "User already exists" });
        }
        console.log(user);
        const hash_password = yield encrypt_password(password);
        const newuser = new users_1.default({ name, email, password: hash_password });
        yield newuser.save();
        console.log("user saved");
        const token = jsonwebtoken_1.default.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log("token created ");
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        console.log("cookie saved");
        res.status(201).json({ message: "User created sucessfully" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Some error occured", error: err });
    }
});
exports.signup_function = signup_function;
const login_function = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, " ", password);
    if (!email || !password) {
        return res.status(204).json({ message: "User inputs are empty." });
    }
    const foundUser = yield users_1.default.findOne({ email });
    console.log(foundUser);
    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }
    const password_matched = yield bcrypt_1.default.compare(password, foundUser === null || foundUser === void 0 ? void 0 : foundUser.password);
    console.log(password_matched);
    if (password_matched) {
        const token = yield jsonwebtoken_1.default.sign({ userId: foundUser._id }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
        res.status(200).json({ message: "login successfull." });
    }
    else {
        return res
            .status(401)
            .json({ message: "User email or password not matched." });
    }
});
exports.login_function = login_function;

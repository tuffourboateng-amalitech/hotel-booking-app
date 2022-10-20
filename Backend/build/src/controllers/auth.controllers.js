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
exports.loginUser = exports.register = void 0;
const prismaInit_1 = require("../config/prismaInit");
const bcryptConfig_1 = require("../helpers/bcryptConfig");
const jwtAccessToken_1 = require("../helpers/jwtAccessToken");
const jwtRefreshToken_1 = require("../helpers/jwtRefreshToken");
const renewToken_controller_1 = require("./renewToken.controller");
const http_errors_1 = __importDefault(require("http-errors"));
// token maximum age
const maxAge = 7 * 24 * 60 * 60 * 1000;
//  Register Users
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            // check if password matches
            throw new http_errors_1.default.ExpectationFailed('Passwords do not match');
        }
        // check user already exists
        const userExists = yield prismaInit_1.prisma.user.findFirst({
            where: {
                email
            },
        });
        if (userExists)
            throw new http_errors_1.default.Conflict('User Already exist');
        const newUser = yield prismaInit_1.prisma.user.create({
            data: {
                name,
                email,
                password: yield (0, bcryptConfig_1.hashedPassword)(password),
                role: (_a = req.body) === null || _a === void 0 ? void 0 : _a.role,
            },
        });
        const userId = newUser.id;
        res.json({ userId, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
//  LOGIN USERS
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find Incoming user in our database
        const checkUser = yield prismaInit_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!checkUser)
            throw new http_errors_1.default[404]('User not Found please register first');
        // check if password is correct
        const validPassword = yield (0, bcryptConfig_1.compare)(password, checkUser === null || checkUser === void 0 ? void 0 : checkUser.password);
        // if password does not match throw error
        if (!validPassword)
            throw new http_errors_1.default.NotAcceptable('Invalid Credentials');
        const token = yield (0, jwtAccessToken_1.createAccessToken)(checkUser.id); // pass a token for user if credentials are valid
        const refreshToken = (yield (0, jwtRefreshToken_1.createRefreshToken)(checkUser.id)); // refresh token
        renewToken_controller_1.refreshTokens.push({
            user: { id: checkUser.id, name: checkUser.name, role: checkUser.role },
            refreshToken,
        });
        res.cookie('access_token', refreshToken, {
            httpOnly: true,
            maxAge,
            sameSite: 'none',
            secure: true,
        });
        const login_User = {
            id: checkUser.id,
            name: checkUser.name,
            role: checkUser.role,
            token,
        };
        res.status(201).json({ login_User, message: 'Login Successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controllers.js.map
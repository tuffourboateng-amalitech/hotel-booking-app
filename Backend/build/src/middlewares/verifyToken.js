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
exports.verifyAdmin = exports.verifyUser = exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const process_1 = require("process");
const prismaInit_1 = require("../config/prismaInit");
(0, dotenv_1.config)();
const verifyAccessToken = (req, res, next) => {
    try {
        if (!req.headers["authorization"])
            return next(new http_errors_1.default.Unauthorized());
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1] || req.headers["authorization"];
        jsonwebtoken_1.default.verify(token, String(process_1.env.JWT_SECRET), (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
                // res.redirect('/login')
                return next(new http_errors_1.default.Forbidden(message));
            }
            req["payload"] = payload;
            next();
        }));
    }
    catch (err) {
        next(err.message);
    }
};
exports.verifyAccessToken = verifyAccessToken;
//  will work on the verify user middleware later
const verifyUser = (req, res, next) => {
    try {
        const id = req.query;
        (0, exports.verifyAccessToken)(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            const findUser = yield prismaInit_1.prisma.user.findFirst({
                where: {
                    id: id
                }
            });
            if ((findUser === null || findUser === void 0 ? void 0 : findUser.id) === req.params.id || (["Admin"].includes(findUser === null || findUser === void 0 ? void 0 : findUser.role))) {
                next();
            }
            else {
                return next(new http_errors_1.default.Unauthorized("User not found please sign up"));
            }
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    try {
        (0, exports.verifyAccessToken)(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            const permittedUser = yield prismaInit_1.prisma.user.findFirst({
                where: {
                    id: req["payload"].id
                }
            });
            if ((["Admin"].includes(permittedUser === null || permittedUser === void 0 ? void 0 : permittedUser.role))) {
                next();
            }
            else {
                return next(new http_errors_1.default.Unauthorized("You are not authorized"));
            }
        }));
    }
    catch (error) {
        next(error);
    }
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=verifyToken.js.map
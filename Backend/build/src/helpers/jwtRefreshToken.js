"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.maxAge = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
// (24 * 60 * 60 * 7) * 2;
exports.maxAge = '7d';
(0, dotenv_1.config)();
const createRefreshToken = (id) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ id }, String(process.env.REFRESH_TOKEN_SECRET), {
            expiresIn: exports.maxAge,
            issuer: "amalitech.org",
            audience: id,
        }, (err, token) => {
            if (err)
                reject(new http_errors_1.default.InternalServerError());
            resolve(token);
        });
    });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=jwtRefreshToken.js.map
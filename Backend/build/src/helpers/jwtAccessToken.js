"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = exports.maxAge = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
//24 * 60 * 60 * 7;
exports.maxAge = '30m';
(0, dotenv_1.config)();
const createAccessToken = (id) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ id }, String(process.env.JWT_SECRET), {
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
exports.createAccessToken = createAccessToken;
//# sourceMappingURL=jwtAccessToken.js.map
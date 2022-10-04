"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewAccessToken = exports.removeRefreshToken = exports.refreshTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
exports.refreshTokens = [];
// 24 * 60 * 60 * 7
const maxAge = '2d';
const removeRefreshToken = (tokenGiven) => {
    exports.refreshTokens = exports.refreshTokens.filter(token => {
        return token.refreshToken !== tokenGiven;
    });
};
exports.removeRefreshToken = removeRefreshToken;
const renewAccessToken = (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(401); //no cookies or no jwt
        const refreshToken = cookies.jwt;
        let foundUser;
        exports.refreshTokens.forEach((item) => {
            if (Object.values(item)[1] === refreshToken) {
                foundUser = Object.values(item)[0];
            }
        });
        if (!foundUser) {
            return res.status(403).json({ message: 'Not authenticated' });
        }
        jsonwebtoken_1.default.verify(refreshToken, String(process_1.env.REFRESH_TOKEN_SECRET), (err, id) => {
            const actualId = id.id;
            if (!err) {
                //refresh token by user
                const accessToken = jsonwebtoken_1.default.sign({ id: actualId }, String(process_1.env.ACCESS_TOKEN_SECRET), {
                    expiresIn: maxAge,
                    issuer: 'amalitech.org',
                });
                res.status(201).json({ role: foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, userId: foundUser === null || foundUser === void 0 ? void 0 : foundUser.id, name: foundUser === null || foundUser === void 0 ? void 0 : foundUser.name, accessToken });
            }
            else {
                res.status(403).json({ message: 'Not authenticated' });
            }
        });
    }
    catch (err) {
        next(err.message);
    }
};
exports.renewAccessToken = renewAccessToken;
//# sourceMappingURL=renewToken.controller.js.map
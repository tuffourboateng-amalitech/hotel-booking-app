"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validators_1 = require("../middlewares/validators");
const auth_controllers_1 = require("../controllers/auth.controllers");
const authRouter = express_1.default.Router();
authRouter.post('/register', validators_1.validatorSchema, validators_1.passwordValidator, auth_controllers_1.register);
authRouter.post('/login', auth_controllers_1.loginUser);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map
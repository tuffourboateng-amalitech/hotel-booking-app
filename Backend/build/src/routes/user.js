"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const verifyToken_1 = require("../middlewares/verifyToken");
const userRouter = express_1.default.Router();
userRouter.get('/allUsers', users_controllers_1.getAllUsers);
userRouter.get('/user/:id', users_controllers_1.getUser);
userRouter.get('/checkAuth', verifyToken_1.verifyAccessToken, users_controllers_1.checkAuth);
userRouter.get('/checkUser/:id', verifyToken_1.verifyUser, users_controllers_1.checkUser);
exports.default = userRouter;
//# sourceMappingURL=user.js.map
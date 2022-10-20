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
exports.checkAdmin = exports.checkUser = exports.checkAuth = exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.getUser = void 0;
const prismaInit_1 = require("../config/prismaInit");
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ success: true, message: `User with name ${findUser === null || findUser === void 0 ? void 0 : findUser.name} found` });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
// GET ALL USERS
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prismaInit_1.prisma.user.findMany({
            select: {
                name: true,
                email: true,
                password: true
            }
        });
        res.json({ allUsers, success: true, message: "All users fetched" });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDelete = yield prismaInit_1.prisma.user.delete({
            where: {
                id: req.params.id
            }
        });
        res.json({ userDelete, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password } = req.body;
        const userDelete = yield prismaInit_1.prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                name,
                email,
                password,
                role: (_a = req.body) === null || _a === void 0 ? void 0 : _a.role
            }
        });
        res.json({ userDelete, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
// trial
const checkAuth = (req, res, next) => {
    res.send("User Authenticated");
};
exports.checkAuth = checkAuth;
// checkUser controller
const checkUser = (req, res, next) => {
    res.send("Hello user , you are logged in and you can delete your account");
};
exports.checkUser = checkUser;
const checkAdmin = (req, res, next) => {
    res.send("Hello Admin, you are logged in and you can delete all accounts");
};
exports.checkAdmin = checkAdmin;
//# sourceMappingURL=users.controllers.js.map
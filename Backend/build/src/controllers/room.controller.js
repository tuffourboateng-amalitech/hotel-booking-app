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
exports.deleteRoom = exports.updateRoom = exports.getRoom = exports.createRoom = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prismaInit_1 = require("../config/prismaInit");
const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permittedUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: req["payload"].id
            }
        });
        console.log(permittedUser);
        if (!(["Admin"].includes(permittedUser === null || permittedUser === void 0 ? void 0 : permittedUser.role)))
            throw new http_errors_1.default.Forbidden("Unauthorized to perform this duty");
        const hotelId = req.params.id;
        const { title, price, maxPeople, description } = req.body;
        const { number, unavailableDates } = req.body;
        const newRoom = yield prismaInit_1.prisma.room.create({
            data: {
                title,
                price,
                hotel: {
                    connect: {
                        id: hotelId
                    }
                },
                maxPeople,
                description,
                roomNumbers: {
                    create: {
                        number,
                        unavailableDates
                    },
                }
            }
        });
        res.status(200).json({ newRoom, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.createRoom = createRoom;
const getRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const findRoom = yield prismaInit_1.prisma.room.findFirst({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json({ findRoom, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.getRoom = getRoom;
const updateRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const permittedUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        if ((permittedUser === null || permittedUser === void 0 ? void 0 : permittedUser.role) !== "Admin")
            throw new http_errors_1.default.Forbidden("Unauthorized to perform this duty");
        const hotelId = req.params.id;
        const { title, price, maxPeople, description, roomNumbers } = req.body;
        const roomUpdate = yield prismaInit_1.prisma.room.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title,
                price,
                hotel: {
                    connect: {
                        id: hotelId
                    }
                },
                maxPeople,
                description,
                roomNumbers
            }
        });
        res.status(200).json({ roomUpdate, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const permittedUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
            }
        });
        if ((permittedUser === null || permittedUser === void 0 ? void 0 : permittedUser.role) !== "Admin")
            throw new http_errors_1.default.Forbidden("Unauthorized to perform this duty");
        const roomDelete = yield prismaInit_1.prisma.room.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json({ roomDelete, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoom = deleteRoom;
//# sourceMappingURL=room.controller.js.map
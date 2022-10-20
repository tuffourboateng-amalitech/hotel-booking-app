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
exports.getHotelRooms = exports.countByType = exports.countByCity = exports.allHotels = exports.deleteHotel = exports.updateHotel = exports.findHotel = exports.createHotel = void 0;
const prismaInit_1 = require("../config/prismaInit");
const http_errors_1 = __importDefault(require("http-errors"));
// create a hotel
const createHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const permittedUser = yield prismaInit_1.prisma.user.findFirst({
        where: {
            id: req["payload"].id
        }
    });
    if (!(["Admin"].includes(permittedUser === null || permittedUser === void 0 ? void 0 : permittedUser.role)))
        throw new http_errors_1.default.Forbidden("Unauthorized to perform this duty");
    try {
        const { name, city, address, type, description, distance, featured, photos, price, rating, } = req.body;
        const createHotel = yield prismaInit_1.prisma.hotel.create({
            data: {
                name,
                city,
                address,
                type,
                description,
                distance,
                featured,
                photos,
                price,
                rating,
            },
        });
        res.status(200).json({ createHotel, success: true, message: "new hotel created" });
    }
    catch (error) {
        next(error);
    }
});
exports.createHotel = createHotel;
// Get or find a hotel
const findHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const hotelfind = yield prismaInit_1.prisma.hotel.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                address: true,
                city: true,
                description: true,
                distance: true,
                rooms: {
                    select: {
                        id: true,
                        hotelId: true,
                        title: true,
                        description: true,
                        price: true,
                        maxPeople: true,
                        roomNumbers: true
                    }
                },
                featured: true,
                price: true,
                type: true,
                rating: true,
                photos: true
            }
        });
        res.json({ hotelfind, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.findHotel = findHotel;
// Update a hotel
const updateHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permittedUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: req["payload"].id
            }
        });
        if (!(["Admin"].includes(permittedUser === null || permittedUser === void 0 ? void 0 : permittedUser.role)))
            throw new http_errors_1.default.Forbidden("Unauthorized to perform this duty");
        const id = req.params.id;
        const { name, city, address, type, description, distance, featured, photos, price, rating, } = req.body;
        const hotelUpdate = yield prismaInit_1.prisma.hotel.update({
            where: {
                id: id
            },
            data: {
                name,
                city,
                address,
                type,
                description,
                distance,
                featured,
                photos,
                price,
                rating,
            }
        });
        res.json({ hotelUpdate, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.updateHotel = updateHotel;
// Delete a hotel
const deleteHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const permittedUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        if ((permittedUser === null || permittedUser === void 0 ? void 0 : permittedUser.role) !== "Admin")
            throw new http_errors_1.default.Forbidden("Unauthorized to perform this duty");
        const id = req.params.id;
        const hotelDelete = yield prismaInit_1.prisma.hotel.delete({
            where: {
                id
            },
        });
        res.json({ hotelDelete, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteHotel = deleteHotel;
// get all hotels
const allHotels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { max, min } = req.query;
        const getAllHotels = yield prismaInit_1.prisma.hotel.findMany({
            where: {
                featured: {
                    equals: true
                },
                OR: [
                    {
                        price: {
                            gte: min | 1
                        }
                    },
                    {
                        price: {
                            lte: max | 999
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                address: true,
                city: true,
                description: true,
                distance: true,
                rooms: {
                    select: {
                        id: true,
                        hotelId: true,
                        title: true,
                        description: true,
                        price: true,
                        maxPeople: true,
                        roomNumbers: true
                    }
                },
                featured: true,
                price: true,
                type: true,
                rating: true,
                photos: true
            },
            take: 4
        });
        res.status(200).json({ getAllHotels, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.allHotels = allHotels;
const countByCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = req.query.cities.split(",");
        const list = yield Promise.all(cities.map(city => {
            return prismaInit_1.prisma.hotel.count({
                where: {
                    city
                }
            });
        }));
        res.json({ list, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.countByCity = countByCity;
const countByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelCount = yield prismaInit_1.prisma.hotel.count({
            where: {
                type: { contains: "hotel" }
            }
        });
        const appartmentCount = yield prismaInit_1.prisma.hotel.count({
            where: {
                type: { contains: "appartment" }
            }
        });
        const resortCount = yield prismaInit_1.prisma.hotel.count({
            where: {
                type: { contains: "resort" }
            }
        });
        const villaCount = yield prismaInit_1.prisma.hotel.count({
            where: {
                type: { contains: "villa" }
            }
        });
        res.json([
            { type: "hotel", count: hotelCount },
            { type: "appartment", count: appartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
        ]);
    }
    catch (error) {
        next(error);
    }
});
exports.countByType = countByType;
const getHotelRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const hotelRoom = yield prismaInit_1.prisma.hotel.findFirst({
            where: {
                id
            },
            select: {
                rooms: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        maxPeople: true,
                        roomNumbers: true,
                    }
                }
            }
        });
        res.status(200).json({ hotelRoom });
    }
    catch (error) {
        next(error);
    }
});
exports.getHotelRooms = getHotelRooms;
//# sourceMappingURL=hotel.controller.js.map
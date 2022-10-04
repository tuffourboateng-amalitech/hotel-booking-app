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
exports.createHotel = void 0;
const prismaInit_1 = require("../config/prismaInit");
const createHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, city, address, type, description, distance, featured, photos, price, rooms, title, rating, } = req.body;
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
                rooms,
                title,
                rating,
            },
        });
        res.status(200).json({ success: true, message: "new hotel created" });
    }
    catch (error) {
        next(error);
    }
});
exports.createHotel = createHotel;
//# sourceMappingURL=hotel.controller.js.map
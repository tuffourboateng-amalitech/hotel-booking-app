import express from 'express';
import {createHotel, deleteHotel, findHotel, updateHotel, allHotels} from '../controllers/hotel.controller';
import { verifyAdmin} from '../middlewares/verifyToken'
const hotelRouter = express.Router();


hotelRouter.post('/hotel', verifyAdmin, createHotel)
hotelRouter.get('/hotel/:id', findHotel)
hotelRouter.get('/hotels', allHotels)
hotelRouter.patch('/hotel/:id', verifyAdmin, updateHotel)
hotelRouter.delete('/hotel/:id', verifyAdmin, deleteHotel)

export default hotelRouter


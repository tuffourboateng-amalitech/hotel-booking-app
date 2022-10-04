import express from 'express';
import {createHotel, deleteHotel, findHotel, updateHotel} from '../controllers/hotel.controller'
const hotelRouter = express.Router();


hotelRouter.post('/hotel', createHotel)
hotelRouter.get('/hotel/:id', findHotel)
hotelRouter.patch('/hotel/:id', updateHotel)
hotelRouter.delete('/hotel/:id', deleteHotel)

export default hotelRouter


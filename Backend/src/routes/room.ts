import express from 'express';
import {createRoom, deleteRoom, getRoom, updateRoom} from '../controllers/room.controller';
import { verifyAdmin } from '../middlewares/verifyToken';
const roomRouter = express.Router();

roomRouter.post('/room/:id', verifyAdmin, createRoom);
roomRouter.get('/room', getRoom);
roomRouter.patch('/room/:id', updateRoom);
roomRouter.delete('/room/:id', deleteRoom)


export default roomRouter
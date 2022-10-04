import express from 'express';
import {createRoom, deleteRoom, getRoom, updateRoom} from '../controllers/room.controller';
const roomRouter = express.Router();

roomRouter.post('/room/:id', createRoom);
roomRouter.get('/room', getRoom);
roomRouter.patch('/room/:id', updateRoom);
roomRouter.delete('/room/:id', deleteRoom)


export default roomRouter
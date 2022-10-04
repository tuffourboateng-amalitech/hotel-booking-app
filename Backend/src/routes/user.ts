import express from 'express';
import {getAllUsers, getUser, checkAuth, checkUser, checkAdmin, deleteUser, updateUser} from '../controllers/users.controllers';
import { verifyAccessToken, verifyAdmin, verifyUser } from '../middlewares/verifyToken';

const userRouter = express.Router();


userRouter.get('/allUsers', getAllUsers)
userRouter.get('/user/:id', getUser)
userRouter.delete('/user/:id', deleteUser)
userRouter.patch('/user/:id', updateUser)
userRouter.get('/checkAuth', verifyAccessToken, checkAuth)
userRouter.get('/checkUser/:id', verifyUser, checkUser )
userRouter.get('/checkUser/:id', verifyAdmin, checkAdmin )


export default userRouter
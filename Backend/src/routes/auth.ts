import express from 'express'
import { validatorSchema, passwordValidator } from '../middlewares/validators';
import {register, loginUser} from '../controllers/auth.controllers'

const authRouter = express.Router()

authRouter.post('/register', validatorSchema, passwordValidator, register)
authRouter.post('/login', loginUser)

export default authRouter
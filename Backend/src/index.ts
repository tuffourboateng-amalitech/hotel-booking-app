import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import { corsOptions } from './helpers/corsOptions';
import {connection} from './config/dbConnection'
import helmet from 'helmet';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import hotelRouter from './routes/hotel';
import roomRouter from './routes/room';
const app = express();

config()

const PORT = process.env.PORT_NUMBER || 5000


// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));
app.use(helmet())

// Db connection
connection()

// Route calls
app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', hotelRouter)
app.use('/api/v1', roomRouter )

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})


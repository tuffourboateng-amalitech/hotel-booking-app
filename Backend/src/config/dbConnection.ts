import {config} from 'dotenv';
import {prisma} from './prismaInit'

config()

export const connection = async () => {
    await prisma.$connect().then(() => {
        console.log(`DB connected successfully`)
    })
}
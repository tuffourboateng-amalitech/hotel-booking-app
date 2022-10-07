import { Role } from '@prisma/client';
import {Request, Response, NextFunction} from 'express';
import { CreateUser } from '../@types';
import { prisma } from '../config/prismaInit';



export const getUser = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const findUser = await prisma.user.findFirst({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({success: true, message: `User with name ${findUser?.name} found`})
    } catch (error) {
        next(error)
    }
}




// GET ALL USERS

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const allUsers = await prisma.user.findMany({
            select:{
                name: true,
                email:true,
                password: true
            }
        })
        res.json({allUsers, success: true, message: "All users fetched"})
    } catch (error) {
    next(error)
}
}


export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userDelete = await prisma.user.delete({
            where:{
                id: req.params.id
            }
        })
        res.json({userDelete, success: true})
    } catch (error) {
        next(error)
    }
}
export const updateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {name, email, password} = req.body as CreateUser
        const userDelete = await prisma.user.update({
            where:{
                id: req.params.id
            },
            data:{
                name,
                email,
                password,
                role: req.body?.role as Role
            }
        })
        res.json({userDelete, success: true})
    } catch (error) {
        next(error)
    }
}

// trial
export const checkAuth = (req:Request, res:Response,next:NextFunction) => {
    res.send("User Authenticated")
}


// checkUser controller
export const checkUser = (req:Request, res:Response, next:NextFunction) => {
    res.send("Hello user , you are logged in and you can delete your account")
}

export const checkAdmin = (req:Request, res:Response, next:NextFunction) => {
    res.send("Hello Admin, you are logged in and you can delete all accounts")
}
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import {Room, RoomNumbers } from '../@types';
import { prisma } from '../config/prismaInit';


export const createRoom = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const permittedUser = await prisma.user.findFirst({
            where:{
                id: req["payload"].id
            }
          })
          console.log(permittedUser)
        if(!(["Admin"].includes(permittedUser?.role))) throw new createHttpError.Forbidden("Unauthorized to perform this duty")
        const hotelId = req.params.id
        const {title, price, maxPeople, description} = req.body as Room
        const {number,unavailableDates} = req.body as RoomNumbers
        const newRoom = await prisma.room.create({
            data:{
                title, 
                price,
                hotel:{
                    connect:{
                        id: hotelId
                    }
                },
                maxPeople,
                description,
                roomNumbers:{
                    create:{
                        number,
                        unavailableDates
                    },
                }
        }})
        res.status(200).json({newRoom, success: true})
    } catch (error) {
        next(error)
    }
}


export const getRoom = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id
        const findRoom = await prisma.room.findFirst({
            where:{
                id: parseInt(id)
            }
        })
        res.status(200).json({findRoom, success: true})
    } catch (error) {
        next(error)
    }
}


export const updateRoom = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const permittedUser = await prisma.user.findFirst({
            where:{
              id: req.user?.id
            }
          })
          if(permittedUser?.role !== "Admin") throw new createHttpError.Forbidden("Unauthorized to perform this duty")

        const hotelId = req.params.id
        const {title, price, maxPeople, description, roomNumbers} = req.body 
        const roomUpdate = await prisma.room.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                title, 
                price,
                hotel:{
                    connect:{
                        id: hotelId
                    }
                },
                maxPeople,
                description, 
                roomNumbers
            }
        })
        res.status(200).json({roomUpdate, success: true})
    } catch (error) {
        next(error)
    }
}


export const deleteRoom = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const permittedUser = await prisma.user.findFirst({
            where:{
              id: req["payload"].id
            }
          })
          if(!(["Admin"].includes(permittedUser.role))) throw new createHttpError.Forbidden("Unauthorized to perform this duty")

        const roomDelete = await prisma.room.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({roomDelete, success: true})
    } catch (error) {
        next(error)
    }
}

import { prisma } from '../config/prismaInit';
import { Request, Response, NextFunction } from 'express';
import { Hotel } from '../@types';
import { Room } from '@prisma/client';
import createHttpError from 'http-errors';


// create a hotel
export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const permittedUser = await prisma.user.findFirst({
    where:{
      id: req["payload"].id
    }
  })
  if(!(["Admin"].includes(permittedUser?.role))) throw new createHttpError.Forbidden("Unauthorized to perform this duty")
  try {
    const {
      name,
      city,
      address,
      type,
      description,
      distance,
      featured,
      photos,
      price,
      rating,
    } = req.body as Hotel;
    const createHotel = await prisma.hotel.create({
      data: {
        name,
        city,
        address,
        type,
        description, 
        distance, 
        featured,
        photos,
        price,
        rating,
      },
    });

    res.status(200).json({createHotel,success: true, message: "new hotel created"})
  } catch (error) {
    next(error);
  }
}


// Get or find a hotel
export const findHotel = async(req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.id
    const hotelfind = await prisma.hotel.findFirst({
      where:{
        id: id
      },
      select:{
        id: true,
        name: true,
        address: true,
        city: true,
        description: true,
        distance: true,
        rooms:{
          select:{
            id: true,
            hotelId: true,
            title: true,
            description: true,
            price: true,
            maxPeople: true,
            roomNumbers: true
          }
        },
        featured: true,
        price: true,
        type: true,
        rating: true,
        photos: true
      }
    })
    res.json({hotelfind, success: true})
  } catch (error) {
    next(error)
  }
}



// Update a hotel

export const updateHotel = async(req:Request, res:Response, next:NextFunction) => {
  try {
    const permittedUser = await prisma.user.findFirst({
      where:{
        id: req["payload"].id
      }
    })
    if(!(["Admin"].includes(permittedUser?.role))) throw new createHttpError.Forbidden("Unauthorized to perform this duty")


    const id = req.params.id
    const {
      name,
      city,
      address,
      type,
      description,
      distance,
      featured,
      photos,
      price,
      rating,
    } = req.body as Hotel;
    const hotelUpdate = await prisma.hotel.update({
      where:{
        id: id
      },
      data:{
        name,
        city,
        address,
        type,
        description,
        distance,
        featured,
        photos,
        price,
        rating,
      }
    })
    res.json({hotelUpdate, success: true})
  } catch (error) {
    next(error)
  }
}


// Delete a hotel
export const deleteHotel = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const permittedUser = await prisma.user.findFirst({
      where:{
        id: req.user?.id
      }
    })
    if(permittedUser?.role !== "Admin") throw new createHttpError.Forbidden("Unauthorized to perform this duty")

    const id = req.params.id
    const hotelDelete = await prisma.hotel.delete({
      where:{
        id
      },
    })
    res.json({hotelDelete, success: true})
  } catch (error) {
    next(error)
  }
}  

// get all hotels
export const allHotels = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const getAllHotels = await prisma.hotel.findMany({
      select:{
        id: true,
        name: true,
        address: true,
        city: true,
        description: true,
        distance: true,
        rooms:{
          select:{
            id: true,
            hotelId: true,
            title: true,
            description: true,
            price: true,
            maxPeople: true,
            roomNumbers: true
          }
        },
        featured: true,
        price: true,
        type: true,
        rating: true,
        photos: true
      }
    })
    res.status(200).json({getAllHotels, success: true})
  } catch (error) {
    next(error)
  }
}

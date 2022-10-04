import { prisma } from '../config/prismaInit';
import { Request, Response, NextFunction } from 'express';
import { Hotel } from '../@types';
import { Room } from '@prisma/client';


// create a hotel
export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        id
      },
      select:{
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

import { prisma } from '../config/prismaInit';
import { Request, Response, NextFunction } from 'express';
import { Hotel } from '../@types';
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


interface queryHotel{
  max:number;
  min:number;
}

// get all hotels
export const allHotels = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {max, min} = <unknown>req.query as queryHotel
    const getAllHotels = await prisma.hotel.findMany({
      where:{
        featured: {
          equals: true
        },
        OR:[
          {
            price: {
              gte: min | 1
            }
          },
          {
            price:{
              lte: max | 999
            }
          }
        ]
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
      },
      take:4
    })
    res.status(200).json({getAllHotels, success: true})
  } catch (error) {
    next(error)
  }
}


export const countByCity = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const cities = (<string>req.query.cities).split(",")
    const list = await Promise.all(cities.map(city => {
      return prisma.hotel.count({
        where:{
          city
        }
      })
    }))
    res.json({list, success: true})
  } catch (error) {
   next(error) 
  }
}

export const countByType = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const hotelCount = await prisma.hotel.count({
      where:{
      type:{contains: "hotel"}
      }
    })
    const appartmentCount = await prisma.hotel.count({
      where:{
      type:{contains: "appartment"}
      }
    })
    const resortCount = await prisma.hotel.count({
      where:{
      type:{contains: "resort"}
      }
    })
    const villaCount = await prisma.hotel.count({
      where:{
      type:{contains: "villa"}
      }
    })
    res.json([
      {type: "hotel", count: hotelCount},
      {type: "appartment", count: appartmentCount},
      {type: "resort", count: resortCount},
      {type: "villa", count: villaCount},
    ])
  } catch (error) {
   next(error) 
  }
}


export const getHotelRooms = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const hotelId = req.params.id
    const hotelRoom = await prisma.hotel.findMany({
      where:{
        id: hotelId
      },
      select:{
        rooms:{
          select:{
            id: true,
            title: true,
            description: true,
            price: true,
            maxPeople: true,
            roomNumbers: true,
          }
        }
      }
    })
    res.status(200).json({hotelRoom})
  } catch (error) {
    next(error)
  }
}
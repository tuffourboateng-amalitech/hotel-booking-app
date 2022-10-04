import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import {config} from 'dotenv';
import {User} from '../@types'
import { prisma } from '../config/prismaInit';


config()
export const verifyAccessToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    if (!req.headers["authorization"])
      return next(new createHttpError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1] || req.headers["authorization"];
    jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), async (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          // res.redirect('/login')
        return next(new createHttpError.Forbidden(message));
      }
      (<any>req).payload = payload 
      next();
    });
  }catch(err: any){
    next(err.message)
  }
  };


  export const verifyUser = async (req:Request, res:Response, next:NextFunction) => {
      try{
          const findUser = await prisma.user.findFirst({
            where:{
              id: req.user?.id
            }
          })

          verifyAccessToken(req, res, () => {
            if(findUser?.id === req.params.id || findUser?.role === "Admin"){
              next()
            }
            else{
              return next(new createHttpError.Unauthorized("You are not authorized"))
            }
          })
      }catch(error){
        next(error)
      }
  }

  export const verifyAdmin = async (req:Request, res:Response, next:NextFunction) => {
      try{
          const findUser = await prisma.user.findFirst({
            where:{
              id: req.user?.id
            }
          })

          verifyAccessToken(req, res, () => {
            if(findUser?.role === "Admin"){
              next()
            }
            else{
              return next(new createHttpError.Unauthorized("You are not authorized"))
            }
          })
      }catch(error){
        next(error)
      }
  }
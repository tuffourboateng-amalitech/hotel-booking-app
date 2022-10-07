import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import {config} from 'dotenv';
import {env} from 'process'
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
    jwt.verify(token, String(env.JWT_SECRET), async (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          // res.redirect('/login')
          return next(new createHttpError.Forbidden(message));
      }
       req["payload"] = payload 
      next();
    });
  }catch(err: any){
    next(err.message)
  }
  };


  //  will work on the verify user middleware later
  export const verifyUser = (req:Request, res:Response, next:NextFunction) => {
      try{
        const id = req.query
          verifyAccessToken(req, res, async() => {
            const findUser = await prisma.user.findFirst({
              where:{
                id: id
              }
            })
            if(findUser?.id === req.params.id || (["Admin"].includes(findUser?.role))){
              next()
            }
            else{
              return next(new createHttpError.Unauthorized("User not found please sign up"))
            }
          })
      }catch(error){
        next(error)
      }
  }

  export const verifyAdmin = (req:Request, res:Response, next:NextFunction) => {
      try{
          verifyAccessToken(req, res, async() => {
            const permittedUser = await prisma.user.findFirst({
              where:{
                id: req["payload"].id
              }
             })
            if((["Admin"].includes(permittedUser?.role))){
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
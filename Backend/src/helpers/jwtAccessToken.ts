import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import createError from 'http-errors';

//24 * 60 * 60 * 7;
export const maxAge = '30m'
config()

export const createAccessToken = (id: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      String(process.env.JWT_SECRET),
      {
        expiresIn: maxAge,
        issuer: "amalitech.org",
        audience: id,
      },
      (err, token) => {
        if (err) reject(new createError.InternalServerError());
        resolve(token);
      }
    );
  });
};
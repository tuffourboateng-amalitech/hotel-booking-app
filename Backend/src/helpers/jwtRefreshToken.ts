import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import createError from 'http-errors';


// (24 * 60 * 60 * 7) * 2;

export const maxAge = '7d';
config()
export const createRefreshToken = (id: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      String(process.env.REFRESH_TOKEN_SECRET),
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
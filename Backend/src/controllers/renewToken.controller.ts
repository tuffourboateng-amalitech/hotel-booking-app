import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from 'process';


export type RefreshTokenUser = {
  id: string;
  name: string;
  role?: string | null;
}

export type RefreshTokensType = {
  user: RefreshTokenUser;
  refreshToken: string
}
export type TokenRenewType = {
    id: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
  }
export let refreshTokens: RefreshTokensType[] = [];
// 24 * 60 * 60 * 7
const maxAge = '2d';

export const removeRefreshToken = (tokenGiven: string) => {
    refreshTokens = refreshTokens.filter(token => {
        return token.refreshToken !== tokenGiven })
}

export const renewAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //no cookies or no jwt
    const refreshToken = cookies.jwt as string;
    
    let foundUser: RefreshTokenUser | undefined;
    refreshTokens.forEach((item) => {
      if(Object.values(item)[1] === refreshToken){
        foundUser = Object.values(item)[0] as RefreshTokenUser
      }
    })

    if(!foundUser) {
        return res.status(403).json({ message: 'Not authenticated' });
      }
    
    jwt.verify(
      refreshToken,
      String(env.REFRESH_TOKEN_SECRET),
      (err: any, id:TokenRenewType | any) => {
        const actualId = id.id
        if (!err) {
          //refresh token by user
          const accessToken = jwt.sign(
            { id:actualId },
            String(env.ACCESS_TOKEN_SECRET),
            {
              expiresIn: maxAge,
              issuer: 'amalitech.org',
            }
          );
          res.status(201).json({ role: foundUser?.role, userId: foundUser?.id, name: foundUser?.name, accessToken });
        } else {
          res.status(403).json({ message: 'Not authenticated' });
        }
      }
    );
  } catch (err: any) {
    next(err.message);
  }
};

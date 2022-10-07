import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import { hashedPassword, compare } from '../helpers/bcryptConfig';
import { createAccessToken } from '../helpers/jwtAccessToken';
import { createRefreshToken } from '../helpers/jwtRefreshToken';
import { refreshTokens } from './renewToken.controller';
import createHttpError from 'http-errors';
import { CreateUser } from '../@types';
import { Role } from '@prisma/client';

// token maximum age
const maxAge = 7 * 24 * 60 * 60 * 1000;

//  Register Users
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, confirmPassword } = req.body as CreateUser;
    if (password !== confirmPassword) {
      // check if password matches
      throw new createHttpError.ExpectationFailed('Passwords do not match');
    }

    // check user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email
      },
    });
    if (userExists) throw new createHttpError.Conflict('User Already exist');

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashedPassword(password),
        role: req.body?.role as Role,
      },
    });
    const userId = newUser.id;
    res.json({ userId, success: true });
  } catch (error) {
    next(error);
  }
};

//  LOGIN USERS
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as CreateUser;

    // Find Incoming user in our database
    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkUser)
      throw new createHttpError[404]('User not Found please register first');

    // check if password is correct
    const validPassword = await compare(password, checkUser?.password);
    // if password does not match throw error
    if (!validPassword)
      throw new createHttpError.NotAcceptable('Invalid Credentials');

    const token = await createAccessToken(checkUser.id); // pass a token for user if credentials are valid
    const refreshToken = (await createRefreshToken(checkUser.id)) as string; // refresh token

    refreshTokens.push({
      user: { id: checkUser.id, name: checkUser.name, role: checkUser.role },
      refreshToken,
    });
    res.cookie('access_token', refreshToken, {
      httpOnly: true,
      maxAge,
      sameSite: 'none',
      secure: true,
    });
    const login_User = {
      id: checkUser.id,
      name: checkUser.name,
      role: checkUser.role,
      token,
    };
    res.status(201).json({ login_User, message: 'Login Successfully' });
  } catch (error) {
    next(error);
  }
};
